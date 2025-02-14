---
title: "IAM Role for GitHub Actions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.9" lastModifiedVersion="0.73.0"/>

# IAM Role for GitHub Actions

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/github-actions-iam-role" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module can be used to create Assume Role policies and IAM Roles such that they can be used with
GitHub Actions. This requires you to provision an IAM OpenID Connect Provider for GitHub Actions in your account. By
using OpenID Connect, GitHub Actions can directly exchange credentials to access AWS without having to store and provide
GitHub with permanent AWS access credentials. This is useful to prevent credential leaks from progressing undetected.

You can either use the
[account-baseline-app](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/landingzone/account-baseline-app)
or
[account-baseline-security](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/landingzone/account-baseline-security)
modules (setting `enable_github_actions_access = true`) or by adding the following resource to your Terraform module:

```hcl
resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.oidc_thumbprint.certificates[0].sha1_fingerprint]
}

data "tls_certificate" "oidc_thumbprint" {
  url = "https://token.actions.githubusercontent.com"
}
```

## Creating the IAM Role

```hcl
module "iam_role" {
  # Update <VERSION> with latest version of the module
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=<VERSION>"

  github_actions_openid_connect_provider_arn = aws_iam_openid_connect_provider.github_actions.arn
  github_actions_openid_connect_provider_url = aws_iam_openid_connect_provider.github_actions.url

  allowed_sources = {
    "gruntwork-io/terraform-aws-security" = ["main"]
  }

  iam_role_name                  = "example-iam-role"
  permitted_full_access_services = ["ec2"]
}
```

## Security Considerations

The above example will configure the IAM role `example-iam-role` such that it is available to be assumed by GitHub
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
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=<VERSION>"

  github_actions_openid_connect_provider_arn = aws_iam_openid_connect_provider.github_actions.arn
  github_actions_openid_connect_provider_url = aws_iam_openid_connect_provider.github_actions.url

  allowed_sources = {
    "gruntwork-io/terraform-aws-security"              = ["main", "dev"]
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

  github_actions_openid_connect_provider_arn = aws_iam_openid_connect_provider.github_actions.arn
  github_actions_openid_connect_provider_url = aws_iam_openid_connect_provider.github_actions.url

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

## Using created IAM Role in GitHub Actions Workflow

To use the created IAM role in your GitHub Actions Workflow, you need to configure the following:

1.  Attach permissions to write `id-token` at the workflow or job level. To add this permission, add the following as a
    top level key, or under the `job`:

    permissions:
    id-token: write

2.  Add the `aws-actions/configure-aws-credentials` to your step. This retrieves a JWT from the GitHub OIDC provider,
    and then requests an access token from AWS. For more information, see the [AWS
    documentation](https://github.com/aws-actions/configure-aws-credentials).

```yaml
       - name: configure aws credentials
         uses: aws-actions/configure-aws-credentials@master
         with:
           role-to-assume: IAM_ROLE_ARN_OUTPUT_OF_MODULE
           role-session-name: ANY_CUSTOM_SESSION_NAME
           aws-region: DEFAULT_REGION_TO_USE
```

With these two settings, your GitHub Action should now be able to assume the IAM role you created in this module. The
following is a full GitHub Action Workflow example that lists EC2 instances on every push:

```yaml
# Sample workflow to access AWS resources when workflow is tied to branch
name: AWS example workflow
on:
  push
permissions:
  id-token: write
jobs:
  ReadEC2Instances:
    runs-on: ubuntu-latest
    steps:
      - name: configure aws credentials
        uses: aws-actions/configure-aws-credentials@master
        with:
          role-to-assume: IAM_ROLE_ARN_OUTPUT_OF_MODULE
          role-session-name: ANY_CUSTOM_SESSION_NAME
          aws-region: us-east-1
      - name: Whoami?
        run: |
          aws sts get-caller-identity
      - name: Read EC2 Instances
        run: |
          aws ec2 describe-instances
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-IAM-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

module "github_actions_iam_role" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.75.9"

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

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which GitHub repos are allowed to assume the IAM role. Examples:
  # StringEquals, StringLike, etc.
  allowed_sources_condition_operator = "StringEquals"

  # Whether to create the IAM role and attach permissions for GitHub Actions to
  # assume.
  create_iam_role = true

  # Flag to enable/disable the creation of the GitHub OIDC provider.
  create_oidc_provider = false

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # ARN of the OpenID Connect Provider provisioned for GitHub Actions.
  github_actions_openid_connect_provider_arn = ""

  # URL of the OpenID Connect Provider provisioned for GitHub Actions.
  github_actions_openid_connect_provider_url = ""

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

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GITHUB-ACTIONS-IAM-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.75.9"
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

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which GitHub repos are allowed to assume the IAM role. Examples:
  # StringEquals, StringLike, etc.
  allowed_sources_condition_operator = "StringEquals"

  # Whether to create the IAM role and attach permissions for GitHub Actions to
  # assume.
  create_iam_role = true

  # Flag to enable/disable the creation of the GitHub OIDC provider.
  create_oidc_provider = false

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # ARN of the OpenID Connect Provider provisioned for GitHub Actions.
  github_actions_openid_connect_provider_arn = ""

  # URL of the OpenID Connect Provider provisioned for GitHub Actions.
  github_actions_openid_connect_provider_url = ""

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

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

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

<HclListItem name="allowed_sources_condition_operator" requirement="optional" type="string">
<HclListItemDescription>

The string operator to use when evaluating the AWS IAM condition for determining which GitHub repos are allowed to assume the IAM role. Examples: StringEquals, StringLike, etc.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;StringEquals&quot;"/>
</HclListItem>

<HclListItem name="create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create the IAM role and attach permissions for GitHub Actions to assume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_oidc_provider" requirement="optional" type="bool">
<HclListItemDescription>

Flag to enable/disable the creation of the GitHub OIDC provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_iam_policy_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the custom inline IAM policy that is attached to the Role/Group when <a href="#iam_policy"><code>iam_policy</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GrantCustomIAMPolicy&quot;"/>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the OpenID Connect Provider provisioned for GitHub Actions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_url" requirement="optional" type="string">
<HclListItemDescription>

URL of the OpenID Connect Provider provisioned for GitHub Actions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="assume_role_policy_json">
<HclListItemDescription>

JSON value for IAM Role Assume Role Policy that allows GitHub Actions to inherit IAM Role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_arn">
<HclListItemDescription>

ARN for the OIDC provider created for GitHub Actions, if <a href="#create_oidc_provider"><code>create_oidc_provider</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_url">
<HclListItemDescription>

Url used for the OIDC provider, if <a href="#create_oidc_provider"><code>create_oidc_provider</code></a> is set to true.

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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/github-actions-iam-role/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/github-actions-iam-role/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/github-actions-iam-role/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "437a7c3459f25bb007702b05edf48570"
}
##DOCS-SOURCER-END -->
