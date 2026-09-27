---
title: "IAM Role for GitLab Pipelines"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.7.1" lastModifiedVersion="1.6.0"/>

# IAM Role for GitLab Pipelines

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.7.1/modules/gitlab-pipelines-iam-role" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.6.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module can be used to create Assume Role policies and IAM Roles such that they can be used with
GitLab Pipelines. This requires you to provision an IAM OpenID Connect Provider for GitLab Pipelines in your account. By
using OpenID Connect, GitLab Pipelines can directly exchange credentials to access AWS without having to store and provide
GitLab with permanent AWS access credentials. This is useful to prevent credential leaks from progressing undetected.

You can use the [OpenID Connect Provider for GitLab Pipelines](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.7.1/modules/gitlab-pipelines-openid-connect-provider/README.md) module in the IAM role creation process like so:

```hcl
module "gitlab_pipelines_openid_connect_provider" {
  # Update <VERSION> with latest version of the module
  source = "github.com/gruntwork-io/terraform-aws-security//modules/gitlab-pipelines-openid-connect-provider?ref=<VERSION>"

  # Update <ALLOWED_GROUPS> with the list of GitLab top level groups that are allowed to assume roles in the account
  allowed_groups = <ALLOWED_GROUPS>
}
```

or use its contents to create a resource directly in the IAM role module.

## Creating the IAM Role

```hcl
module "iam_role" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-iam-role?ref=<VERSION>"


  gitlab_pipelines_openid_connect_provider_arn = module.gitlab_pipelines_openid_connect_provider.arn
  gitlab_pipelines_openid_connect_provider_url = module.gitlab_pipelines_openid_connect_provider.url

  allowed_sources = {
    "gruntwork-io/terraform-aws-security" = ["main"]
  }

  iam_role_name                  = "example-iam-role"
  permitted_full_access_services = ["ec2"]
}
```

## Security Considerations

The above example will configure the IAM role `example-iam-role` such that it is available to be assumed by GitLab
Actions if it is run from the `main` branch of the `gruntwork-io/terraform-aws-security` repository. The IAM role would then
have the ability to call any API in the `ec2` namespace.

You can further customize the IAM role using the following variables:

*   `permitted_full_access_services`: List of AWS services that the IAM role will have full access to (set to
    `SERVICE_NAME:*`).
*   `iam_policy`: IAM policy statements that should be directly attached (inline) to the IAM role.
*   `iam_policy_arns`: List of IAM Policy ARNs that should be attached to the IAM role.
*   `iam_customer_managed_policy_names`: List of customer managed IAM policies that should be attached to the IAM role.
*   `iam_aws_managed_policy_names`: List of AWS managed IAM policies that should be attached to the IAM role.

Extend the `allowed_sources` map if you want to allow additional repositories or branches. For example, if you want to
allow the `dev` branch on `terraform-aws-security`, as well as the `main` branch from `terraform-aws-service-catalog`:

```hcl
module "iam_role" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-iam-role?ref=<VERSION>"

  gitlab_pipelines_openid_connect_provider_arn = module.gitlab_pipelines_openid_connect_provider.arn
  gitlab_pipelines_openid_connect_provider_url = module.gitlab_pipelines_openid_connect_provider.url

  allowed_sources = {
    "gruntwork-io/terraform-aws-security"        = ["main", "dev"]
    "gruntwork-io/terraform-aws-service-catalog" = ["main"]
  }

  iam_role_name                  = "example-iam-role"
  permitted_full_access_services = ["ec2"]
}
```

You can also use the module to only manage the assume role policy. This is useful if you want more control over the IAM
role creation. For example:

```hcl
module "assume_role_policy" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=<VERSION>"

  gitlab_pipelines_openid_connect_provider_arn = module.gitlab_pipelines_openid_connect_provider.arn
  gitlab_pipelines_openid_connect_provider_url = module.gitlab_pipelines_openid_connect_provider.url

  allowed_sources = {
    "gruntwork-io/terraform-aws-security"        = ["main", "dev"]
    "gruntwork-io/terraform-aws-service-catalog" = ["main"]
  }

  create_iam_role = false
}

resource "aws_iam_role" "example" {
  name               = "example-iam-role"
  assume_role_policy = module.assume_role_policy.assume_role_policy_json
}
```

## Trusting tags, environments and pull requests

`allowed_sources` is a shorthand for branches: each value is turned into the subject claim
`repo:<key>:ref:refs/heads/<branch>`.

GitHub Actions has many other subject claims, such as a workflow triggered by a tag push that uses
`repo:<org>/<repo>:ref:refs/tags/<tag>`, one running against a named environment that uses
`repo:<org>/<repo>:environment:<name>`, and one triggered by a pull request that uses `repo:<org>/<repo>:pull_request`.

To trust one or more of thse, use `allowed_source_claims`. This var is keyed exactly like `allowed_sources`, and each
value is the part of the subject claim that comes after `repo:<key>:`. The module adds the prefix for you, so a key using the
immutable ID format carries through here too. Both variables feed the same `sub` condition, so you can mix them:

```hcl
module "iam_role" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=<VERSION>"

  github_actions_openid_connect_provider_arn = aws_iam_openid_connect_provider.github_actions.arn
  github_actions_openid_connect_provider_url = aws_iam_openid_connect_provider.github_actions.url

  # Plan runs on the main branch...
  allowed_sources = {
    "acmecorp/infra-live" = ["main"]
  }

  # ...but deploys only from a tag push or the "prod" environment.
  allowed_source_claims = {
    "acmecorp/infra-live" = ["ref:refs/tags/v*", "environment:prod"]
  }

  # Required because "ref:refs/tags/v*" contains a wildcard.
  allowed_sources_condition_operator = "StringLike"

  iam_role_name                  = "example-iam-role"
  permitted_full_access_services = ["ec2"]
}
```

That role trusts three subjects:

```
repo:acmecorp/infra-live:ref:refs/heads/main
repo:acmecorp/infra-live:ref:refs/tags/v*
repo:acmecorp/infra-live:environment:prod
```

With this method, be aware of the following:

*   Wildcards in `allowed_source_claims` need `allowed_sources_condition_operator = "StringLike"`, exactly as they do
    in `allowed_sources`. Under the default `StringEquals`, `*` is matched literally and the condition silently never
    grants anything, so the module fails the plan with a precondition error instead.
*   Don't repeat the `repo:<key>:` prefix in a value; use `"ref:refs/tags/v1.0.0"` and not
    `"repo:acmecorp/infra-live:ref:refs/tags/v1.0.0"`.

`allowed_source_claims` can be used on its own, with no `allowed_sources` at all, if the role should only ever be
assumed by tag- or environment-scoped runs. See [GitHub's list of example subject
claims](https://docs.github.com/en/actions/concepts/security/openid-connect#example-subject-claims) for everything
you can put here.

## Using created IAM Role in GitLab Pipelines Workflow

TODO

```yaml
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com/${CI_PROJECT_NAMESPACE}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITLAB-PIPELINES-IAM-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

module "gitlab_pipelines_iam_role" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-iam-role?ref=v1.7.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of the OpenID Connect Provider provisioned for GitLab Pipelines.
  gitlab_pipelines_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for GitLab Pipelines.
  gitlab_pipelines_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of GitLab project path to the list of additional subject claims that are allowed to assume the IAM role. The
  # keys use the same format as var.allowed_sources, and each value is the portion of the OIDC token's "sub" claim
  # that follows "project_path:<key>:". Use this for any trust that the branch shorthand in var.allowed_sources can't
  # express, for example:
  #   - "ref_type:tag:ref:v1.0.0" or "ref_type:tag:ref:*" for pipelines triggered by a tag.
  #   - "environment:production" for pipelines running against a named GitLab environment.
  # Do not include the "project_path:<key>:" prefix in the value; this module adds it. Entries here are merged with
  # the ones built from var.allowed_sources into the same "sub" condition, and wildcards ("*") require
  # var.allowed_sources_condition_operator to be "StringLike" just as they do there. See
  # https://docs.gitlab.com/ci/secrets/id_token_authentication/#token-payload for the full list of subject claim
  # formats GitLab can issue.
  #
  allowed_source_claims = {}

  # Map of GitLab project path to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as
  # group/subgroup/repo-name (e.g., gruntwork-io/terrraform-aws-ci). This
  # variable only covers branches; to trust pipelines triggered by anything else
  # (e.g., tags, named environments) use var.allowed_source_claims. At least one
  # of the two variables must be set.
  allowed_sources = {}

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which GitLab repos are allowed to assume the IAM role. Examples:
  # StringEquals, StringLike, etc.
  allowed_sources_condition_operator = "StringEquals"

  # Whether to create the IAM role and attach permissions for GitLab Pipelines
  # to assume.
  create_iam_role = true

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # A list of IAM AWS Managed Policy names to attach to the group.
  iam_aws_managed_policy_names = null

  # A list of IAM AWS Customer Managed policy names to attach to the group.
  iam_customer_managed_policy_names = null

  # An object defining the IAM policy statements that should be attached
  # directly to the IAM role/group. The input is a map of objects where the map
  # keys are SIDs for IAM policy statements, and the object fields are the
  # resources, actions, and the effect of the statement.
  iam_policy = {}

  # A list of policies (by ARN) to attach to this group.
  iam_policy_arns = null

  # The name of an IAM role to create. Required when var.create_iam_role is
  # true.
  iam_role_name = null

  # Path to the role. See IAM Identifiers for more information:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html.
  iam_role_path = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

  # A map of tags to apply to the IAM role.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITLAB-PIPELINES-IAM-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/gitlab-pipelines-iam-role?ref=v1.7.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of the OpenID Connect Provider provisioned for GitLab Pipelines.
  gitlab_pipelines_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for GitLab Pipelines.
  gitlab_pipelines_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of GitLab project path to the list of additional subject claims that are allowed to assume the IAM role. The
  # keys use the same format as var.allowed_sources, and each value is the portion of the OIDC token's "sub" claim
  # that follows "project_path:<key>:". Use this for any trust that the branch shorthand in var.allowed_sources can't
  # express, for example:
  #   - "ref_type:tag:ref:v1.0.0" or "ref_type:tag:ref:*" for pipelines triggered by a tag.
  #   - "environment:production" for pipelines running against a named GitLab environment.
  # Do not include the "project_path:<key>:" prefix in the value; this module adds it. Entries here are merged with
  # the ones built from var.allowed_sources into the same "sub" condition, and wildcards ("*") require
  # var.allowed_sources_condition_operator to be "StringLike" just as they do there. See
  # https://docs.gitlab.com/ci/secrets/id_token_authentication/#token-payload for the full list of subject claim
  # formats GitLab can issue.
  #
  allowed_source_claims = {}

  # Map of GitLab project path to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as
  # group/subgroup/repo-name (e.g., gruntwork-io/terrraform-aws-ci). This
  # variable only covers branches; to trust pipelines triggered by anything else
  # (e.g., tags, named environments) use var.allowed_source_claims. At least one
  # of the two variables must be set.
  allowed_sources = {}

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which GitLab repos are allowed to assume the IAM role. Examples:
  # StringEquals, StringLike, etc.
  allowed_sources_condition_operator = "StringEquals"

  # Whether to create the IAM role and attach permissions for GitLab Pipelines
  # to assume.
  create_iam_role = true

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # A list of IAM AWS Managed Policy names to attach to the group.
  iam_aws_managed_policy_names = null

  # A list of IAM AWS Customer Managed policy names to attach to the group.
  iam_customer_managed_policy_names = null

  # An object defining the IAM policy statements that should be attached
  # directly to the IAM role/group. The input is a map of objects where the map
  # keys are SIDs for IAM policy statements, and the object fields are the
  # resources, actions, and the effect of the statement.
  iam_policy = {}

  # A list of policies (by ARN) to attach to this group.
  iam_policy_arns = null

  # The name of an IAM role to create. Required when var.create_iam_role is
  # true.
  iam_role_name = null

  # Path to the role. See IAM Identifiers for more information:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html.
  iam_role_path = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

  # A map of tags to apply to the IAM role.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="gitlab_pipelines_openid_connect_provider_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the OpenID Connect Provider provisioned for GitLab Pipelines.

</HclListItemDescription>
</HclListItem>

<HclListItem name="gitlab_pipelines_openid_connect_provider_url" requirement="required" type="string">
<HclListItemDescription>

URL of the OpenID Connect Provider provisioned for GitLab Pipelines.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allowed_source_claims" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Map of GitLab project path to the list of additional subject claims that are allowed to assume the IAM role. The
keys use the same format as <a href="#allowed_sources"><code>allowed_sources</code></a>, and each value is the portion of the OIDC token's 'sub' claim
that follows 'project_path:&lt;key>:'. Use this for any trust that the branch shorthand in <a href="#allowed_sources"><code>allowed_sources</code></a> can't
express, for example:
  - 'ref_type:tag:ref:v1.0.0' or 'ref_type:tag:ref:*' for pipelines triggered by a tag.
  - 'environment:production' for pipelines running against a named GitLab environment.
Do not include the 'project_path:&lt;key>:' prefix in the value; this module adds it. Entries here are merged with
the ones built from <a href="#allowed_sources"><code>allowed_sources</code></a> into the same 'sub' condition, and wildcards ('*') require
<a href="#allowed_sources_condition_operator"><code>allowed_sources_condition_operator</code></a> to be 'StringLike' just as they do there. See
https://docs.gitlab.com/ci/secrets/id_token_authentication/#token-payload for the full list of subject claim
formats GitLab can issue.


</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="allowed_sources" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Map of GitLab project path to the list of branches that are allowed to assume the IAM role. The repository should be encoded as group/subgroup/repo-name (e.g., gruntwork-io/terrraform-aws-ci). This variable only covers branches; to trust pipelines triggered by anything else (e.g., tags, named environments) use <a href="#allowed_source_claims"><code>allowed_source_claims</code></a>. At least one of the two variables must be set.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="allowed_sources_condition_operator" requirement="optional" type="string">
<HclListItemDescription>

The string operator to use when evaluating the AWS IAM condition for determining which GitLab repos are allowed to assume the IAM role. Examples: StringEquals, StringLike, etc.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;StringEquals&quot;"/>
</HclListItem>

<HclListItem name="create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create the IAM role and attach permissions for GitLab Pipelines to assume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_iam_policy_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the custom inline IAM policy that is attached to the Role/Group when <a href="#iam_policy"><code>iam_policy</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GrantCustomIAMPolicy&quot;"/>
</HclListItem>

<HclListItem name="iam_aws_managed_policy_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM AWS Managed Policy names to attach to the group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_customer_managed_policy_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM AWS Customer Managed policy names to attach to the group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" requirement="optional" type="map(object(…))">
<HclListItemDescription>

An object defining the IAM policy statements that should be attached directly to the IAM role/group. The input is a map of objects where the map keys are SIDs for IAM policy statements, and the object fields are the resources, actions, and the effect of the statement.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
     iam_policy = {
       S3Access = {
         actions = ["s3:*"]
         resources = ["arn:aws:s3:::mybucket"]
         effect = "Allow"
       },
       EC2Access = {
         actions = ["ec2:*"]
         resources = ["*"]
         effect = "Allow"
       }
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_policy_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of policies (by ARN) to attach to this group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role to create. Required when <a href="#create_iam_role"><code>create_iam_role</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_path" requirement="optional" type="string">
<HclListItemDescription>

Path to the role. See IAM Identifiers for more information: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_session_duration" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="permitted_full_access_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the IAM role will receive full permissions. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html to find the service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning'].

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="assume_role_policy_json">
<HclListItemDescription>

JSON value for IAM Role Assume Role Policy that allows GitLab Pipelines to inherit IAM Role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_name">
<HclListItemDescription>

The name of the IAM role.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.7.1/modules/gitlab-pipelines-iam-role/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.7.1/modules/gitlab-pipelines-iam-role/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.7.1/modules/gitlab-pipelines-iam-role/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "421a7da1696cc0fb9e88131c66114afc"
}
##DOCS-SOURCER-END -->
