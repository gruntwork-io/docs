---
title: "OpenID Connect Provider for GitLab Pipelines"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.9" lastModifiedVersion="0.75.8"/>

# OpenID Connect Provider for GitLab Pipelines

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/gitlab-pipelines-openid-connect-provider" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an OpenID Connect Provider for GitLab Pipelines. This allows you to use GitLab Pipelines as an identity
provider for your AWS account. This is useful if you want to use GitLab Pipelines to deploy your infrastructure. By
using OpenID Connect, GitLab Pipelines can directly exchange credentials to access AWS without having to store and provide
GitLab with permanent AWS access credentials. This is useful to prevent credential leaks from progressing undetected.

## Creating the Provider

```hcl
module "github_actions_openid_connect_provider" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-openid-connect-provider?ref=<VERSION>"

  allowed_groups = [
    "gruntwork-io",
  ]
}
```

## Security Considerations

The `allowed_groups` parameter is a list of GitLab organizations that are allowed to authenticate with the OpenID
Connect Provider. This is a security measure to ensure that only users from the specified organizations can authenticate
with the OpenID Connect Provider. In addition to this security measure, you should also ensure that all IAM roles
associated with the OpenID Connect Provider have the appropriate trust policy to only allow assumption of the role by
the appropriate GitLab Repos on the appropriate refs.

See the TODO [GitLab Pipelines IAM Role](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/gitlab-pipelines-iam-role/README.md) module for more information.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITLAB-PIPELINES-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

module "gitlab_pipelines_openid_connect_provider" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-openid-connect-provider?ref=v0.75.9"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of GitLab top level groups that are allowed to assume IAM roles in the
  # account.
  allowed_groups = <list(string)>

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
# DEPLOY GRUNTWORK'S GITLAB-PIPELINES-OPENID-CONNECT-PROVIDER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-openid-connect-provider?ref=v0.75.9"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of GitLab top level groups that are allowed to assume IAM roles in the
  # account.
  allowed_groups = <list(string)>

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

<HclListItem name="allowed_groups" requirement="required" type="list(string)">
<HclListItemDescription>

List of GitLab top level groups that are allowed to assume IAM roles in the account.

</HclListItemDescription>
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

ARN for the OIDC provider created for GitLab Pipelines

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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/gitlab-pipelines-openid-connect-provider/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/gitlab-pipelines-openid-connect-provider/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/gitlab-pipelines-openid-connect-provider/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5da7f01b83b841a2e63d24ed0ceaa6d2"
}
##DOCS-SOURCER-END -->
