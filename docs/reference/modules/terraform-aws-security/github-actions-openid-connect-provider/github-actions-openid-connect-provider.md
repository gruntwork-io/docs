---
title: "OpenID Connect Provider for GitHub Actions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.10" lastModifiedVersion="0.73.0"/>

# OpenID Connect Provider for GitHub Actions

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.10/modules/github-actions-openid-connect-provider" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an OpenID Connect Provider for GitHub Actions. This allows you to use GitHub Actions as an identity
provider for your AWS account. This is useful if you want to use GitHub Actions to deploy your infrastructure. By
using OpenID Connect, GitHub Actions can directly exchange credentials to access AWS without having to store and provide
GitHub with permanent AWS access credentials. This is useful to prevent credential leaks from progressing undetected.

## Creating the Provider

```hcl
module "github_actions_openid_connect_provider" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=<VERSION>"

  allowed_organizations = [
    "gruntwork-io",
  ]
}
```

## Security Considerations

The `allowed_organizations` parameter is a list of GitHub organizations that are allowed to authenticate with the OpenID
Connect Provider. This is a security measure to ensure that only users from the specified organizations can authenticate
with the OpenID Connect Provider. In addition to this security measure, you should also ensure that all IAM roles
associated with the OpenID Connect Provider have the appropriate trust policy to only allow assumption of the role by
the appropriate GitHub Repos on the appropriate refs.

See the [GitHub Actions IAM Role](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.10/modules/github-actions-iam-role/README.md) module for more information.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

module "github_actions_openid_connect_provider" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.75.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional thumbprints for the OIDC provider.
  additional_thumbprints = null

  # List of github organizations that are allowed to assume IAM roles in the
  # account. Set either this or `audiences`; audiences wins if both are set.
  allowed_organizations = []

  # List of fully formed URLs to set as audiences that are allowed to assume IAM
  # roles in the account. Set either this or `allowed_organizations`; audiences
  # wins if both are set.
  audiences = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.75.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional thumbprints for the OIDC provider.
  additional_thumbprints = null

  # List of github organizations that are allowed to assume IAM roles in the
  # account. Set either this or `audiences`; audiences wins if both are set.
  allowed_organizations = []

  # List of fully formed URLs to set as audiences that are allowed to assume IAM
  # roles in the account. Set either this or `allowed_organizations`; audiences
  # wins if both are set.
  audiences = []

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="additional_thumbprints" requirement="optional" type="list(string)">
<HclListItemDescription>

List of additional thumbprints for the OIDC provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allowed_organizations" requirement="optional" type="list(string)">
<HclListItemDescription>

List of github organizations that are allowed to assume IAM roles in the account. Set either this or `audiences`; audiences wins if both are set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="audiences" requirement="optional" type="list(string)">
<HclListItemDescription>

List of fully formed URLs to set as audiences that are allowed to assume IAM roles in the account. Set either this or `allowed_organizations`; audiences wins if both are set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.10/modules/github-actions-openid-connect-provider/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.10/modules/github-actions-openid-connect-provider/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.10/modules/github-actions-openid-connect-provider/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f6cc487267be6744dfc9c525750fd06c"
}
##DOCS-SOURCER-END -->
