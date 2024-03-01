---
title: "OpenID Connect Provider for GitHub Actions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.71.2" lastModifiedVersion="0.70.0"/>

# OpenID Connect Provider for GitHub Actions

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.2/modules/github-actions-openid-connect-provider" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an OpenID Connect Provider for GitHub Actions. This allows you to use GitHub Actions as an identity
provider for your AWS account. This is useful if you want to use GitHub Actions to deploy your infrastructure. By
using OpenID Connect, GitHub Actions can directly exchange credentials to access AWS without having to store and provide
GitHub with permanent AWS access credentials. This is useful to prevent credential leaks from progressing undetected.

## Creating the Provider

```hcl
module "github_actions_openid_connect_provider" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=<VERSION>"

  allowed_sources = {
    "gruntwork-io/terraform-aws-security" = ["main"]
  }
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

module "github_actions_openid_connect_provider" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.71.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of github repositories to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as org/repo-name
  # (e.g., gruntwork-io/terrraform-aws-ci).
  allowed_sources = <map(list(string))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional thumbprints for the OIDC provider.
  additional_thumbprints = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.71.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of github repositories to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as org/repo-name
  # (e.g., gruntwork-io/terrraform-aws-ci).
  allowed_sources = <map(list(string))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional thumbprints for the OIDC provider.
  additional_thumbprints = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allowed_sources" requirement="required" type="map(list(…))">
<HclListItemDescription>

Map of github repositories to the list of branches that are allowed to assume the IAM role. The repository should be encoded as org/repo-name (e.g., gruntwork-io/terrraform-aws-ci).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="additional_thumbprints" requirement="optional" type="list(string)">
<HclListItemDescription>

List of additional thumbprints for the OIDC provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

ARN for the OIDC provider created for GitHub Actions

</HclListItemDescription>
</HclListItem>

<HclListItem name="url">
<HclListItemDescription>

Url used for the OIDC provider

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.2/modules/github-actions-openid-connect-provider/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.2/modules/github-actions-openid-connect-provider/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.2/modules/github-actions-openid-connect-provider/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "93a73cee55b09fa484f29417e7352bec"
}
##DOCS-SOURCER-END -->
