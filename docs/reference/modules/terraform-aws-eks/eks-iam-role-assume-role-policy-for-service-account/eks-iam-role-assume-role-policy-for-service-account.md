---
title: "EKS IAM Role Assume Role Policy for Kubernetes Service Accounts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.78.1" lastModifiedVersion="0.64.3"/>

# EKS IAM Role Assume Role Policy for Kubernetes Service Accounts

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.78.1/modules/eks-iam-role-assume-role-policy-for-service-account" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module can be used to create Assume Role policies for IAM Roles such that they can be used with
Kubernetes Service Accounts. This requires a compatible EKS cluster that supports the [IAM Roles for Service
Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) feature.

See the [corresponding section of the eks-cluster-control-plane module
README](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.78.1/modules/eks-cluster-control-plane/README.md#how-do-i-associate-iam-roles-to-the-pods) for information on how to set
up IRSA and how it works.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-IAM-ROLE-ASSUME-ROLE-POLICY-FOR-SERVICE-ACCOUNT MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_iam_role_assume_role_policy_for_service_account" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-iam-role-assume-role-policy-for-service-account?ref=v0.78.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_url = <string>

  # The Kubernetes Namespaces that are allowed to assume the attached IAM Role.
  # Only one of `var.namespaces` or `var.service_accounts` can be set. If both
  # are set, you may end up with an impossible rule! If both are set to null,
  # then this will allow all namespaces and all service accounts.
  namespaces = <list(string)>

  # The Kubernetes Service Accounts that are allowed to assume the attached IAM
  # Role. Only one of `var.namespaces` or `var.service_accounts` can be set. If
  # both are set, you may end up with an impossible rule! If both are set to
  # null, then this will allow all namespaces and all service accounts.
  service_accounts = <list(object(
    name      = string
    namespace = string
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which Service Accounts are allowed to assume the IAM role.
  # Examples: StringEquals, StringLike, etc.
  service_accounts_condition_operator = "StringEquals"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-IAM-ROLE-ASSUME-ROLE-POLICY-FOR-SERVICE-ACCOUNT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-iam-role-assume-role-policy-for-service-account?ref=v0.78.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_url = <string>

  # The Kubernetes Namespaces that are allowed to assume the attached IAM Role.
  # Only one of `var.namespaces` or `var.service_accounts` can be set. If both
  # are set, you may end up with an impossible rule! If both are set to null,
  # then this will allow all namespaces and all service accounts.
  namespaces = <list(string)>

  # The Kubernetes Service Accounts that are allowed to assume the attached IAM
  # Role. Only one of `var.namespaces` or `var.service_accounts` can be set. If
  # both are set, you may end up with an impossible rule! If both are set to
  # null, then this will allow all namespaces and all service accounts.
  service_accounts = <list(object(
    name      = string
    namespace = string
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The string operator to use when evaluating the AWS IAM condition for
  # determining which Service Accounts are allowed to assume the IAM role.
  # Examples: StringEquals, StringLike, etc.
  service_accounts_condition_operator = "StringEquals"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_openid_connect_provider_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the OpenID Connect Provider provisioned for the EKS cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_openid_connect_provider_url" requirement="required" type="string">
<HclListItemDescription>

URL of the OpenID Connect Provider provisioned for the EKS cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="namespaces" requirement="required" type="list(string)">
<HclListItemDescription>

The Kubernetes Namespaces that are allowed to assume the attached IAM Role. Only one of `<a href="#namespaces"><code>namespaces</code></a>` or `<a href="#service_accounts"><code>service_accounts</code></a>` can be set. If both are set, you may end up with an impossible rule! If both are set to null, then this will allow all namespaces and all service accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_accounts" requirement="required" type="list(object(…))">
<HclListItemDescription>

The Kubernetes Service Accounts that are allowed to assume the attached IAM Role. Only one of `<a href="#namespaces"><code>namespaces</code></a>` or `<a href="#service_accounts"><code>service_accounts</code></a>` can be set. If both are set, you may end up with an impossible rule! If both are set to null, then this will allow all namespaces and all service accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    name      = string
    namespace = string
  }))
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="service_accounts_condition_operator" requirement="optional" type="string">
<HclListItemDescription>

The string operator to use when evaluating the AWS IAM condition for determining which Service Accounts are allowed to assume the IAM role. Examples: StringEquals, StringLike, etc.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;StringEquals&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="assume_role_policy_json">
<HclListItemDescription>

JSON value for IAM Role Assume Role Policy that allows Kubernetes Service Account to inherit IAM Role.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.78.1/modules/eks-iam-role-assume-role-policy-for-service-account/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.78.1/modules/eks-iam-role-assume-role-policy-for-service-account/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.78.1/modules/eks-iam-role-assume-role-policy-for-service-account/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6678d384d638081d36b9b13ddeb993c5"
}
##DOCS-SOURCER-END -->
