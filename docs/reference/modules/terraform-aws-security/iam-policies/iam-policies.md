---
title: "A Best-Practices Set of IAM Policy Documents"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.18" lastModifiedVersion="0.69.2"/>

# A Best-Practices Set of IAM Policy Documents

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/iam-policies" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Gruntwork Terraform Module sets up a set of IAM Policy Documents that can be used in IAM users, groups, and roles.
The documents represent a reasonable collection of permissions that will make sense for most organizations for
managing different permissions levels in your AWS account.

Note that these documents are Terraform [data sources](https://www.terraform.io/docs/configuration/data-sources.html),
so they don't create anything themselves and are not intended to be used on their own. The way to use them is to take
the outputs from this module (which are all JSON IAM documents) and plug them into other Terraform resources, such
as `aws_iam_policy`, `aws_iam_user_policy`, `aws_iam_group_policy`, and `aws_iam_role_policy`. See the
[iam-groups](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/iam-groups) and [cross-account-iam-roles](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/cross-account-iam-roles) modules for examples.

If you're not familiar with IAM concepts, start with the [Background Information](#background-information) section as a
way to familiarize yourself with the terminology.

## Motivation

In Summer 2014, a company called CodeSpaces that offered "rock solid, secure, and affordable git hosting and project
management" was forced to shut down after a single rogue employee entered its AWS account and wiped out everything
([See ArsTechnica Article](http://arstechnica.com/security/2014/06/aws-console-breach-leads-to-demise-of-service-with-proven-backup-plan/)).
The goal of this module is to carefully manage access to your AWS account to reduce the chances of rogue employees or
external attackers being able to do too much damage.

## IAM Policy Documents created

This module creates the following IAM Policy documents:

*   **full-access:** provides full access to all resources in the AWS account.

*   **billing:** provides read and write billing settings, but nothing else.

*   **logs:** provides read access to logs in CloudTrail, AWS Config, and CloudWatch. Since CloudTrail logs may be
    encrypted with a KMS CMK, if `var.cloudtrail_kms_key_arn` is set, these users will also get permissions to decrypt
    using this KMS CMK.

*   **developers:** provides whatever permissions are declared in `var.dev_permitted_services`.
    In addition, creates permissions for a personal S3 bucket named `<var.dev_permitted_services><iam-user-name>`.

*   **read-only:** provides read access to all resources in the AWS account but have no write privileges.

*   **use-existing-iam-roles:** allows passing *existing* IAM Roles to AWS resources to which you have been granted
    access. Does not allow creating *new* IAM Roles. See [below](#the-three-levels-of-iam-permissions) for more
    information.

*   **iam-user-self-mgmt:** provides permission to manage your own IAM User account. This includes resetting the IAM User
    password, and generating AWS account credentials. It also grants permission to list other IAM Users, but not to view
    any information about them.

*   **iam-admin:** provides permission to manage all IAM entities. This includes managing users, groups, roles, and
    policies. You might want this if you need to allow ongoing management of an account but don't want to grant full
    administrator (`*:*`) access explicitly.

*   **allow_access_to_other_accounts:** provides permission to assume an IAM role in another AWS account. This makes
    [cross-account access](https://aws.amazon.com/blogs/security/enable-a-new-feature-in-the-aws-management-console-cross-account-access/),
    easy, where you can have all your users defined in one AWS account (e.g. users) and to grant those users access to
    certain IAM roles in other AWS accounts (e.g. stage, prod). The documents that are created and which IAM roles they
    have access to is controlled by the variable `var.allow_access_to_other_account_arns`.

*   **allow_access_to_all_other_accounts:** provides permission to assume an IAM role in all the external AWS accounts
    specified in `var.allow_access_to_other_account_arns`.

*   **allow_access_from_other_accounts:** allows users from other AWS accounts to assume specific roles in this account.
    This makes [cross-account access](https://aws.amazon.com/blogs/security/enable-a-new-feature-in-the-aws-management-console-cross-account-access/),
    easy, where you can have all your users defined in one AWS account (e.g. users) and to grant those users access to
    certain IAM roles in other AWS accounts (e.g. stage, prod). The documents that are created and which IAM roles they
    have access to is controlled by the variable `var.allow_access_from_other_account_arns`.

*   **ssh_grunt_permissions**: provides the permissions [ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/ssh-grunt) needs to validate SSH keys with
    IAM.

*   **auto_deploy_permissions**: provides the permissions in `var.auto_deploy_permissions` to do automated deployment.
    The primary use case is to add these permissions to the IAM role of a CI server (e.g. Jenkins).

*   **allow_auto_deploy_from_other_accounts**: allows the IAM ARNs in `var.allow_auto_deploy_from_other_account_arns` to
    do automated deployment using the permissions in `var.auto_deploy_permissions`. The primary use cases is to allow a
    CI server (e.g. Jenkins) in another AWS account to do automated deployments in this AWS account.

## Additional Guidelines

### The Root AWS Account

When you first create your AWS account, only the [root AWS account](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)
exists. While logged in as the root user, your first and only step should be to create a small number of IAM Users and
assign them the `FullAccess` [AWS managed policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)
so that they can then configure your AWS account as needed using their IAM User accounts.

Now delete the root account's access keys (the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) and store the root AWS
account password in a very safe place. You might also consider setting up a Multi-Factor Authentication
(MFA) device on your root account such as [Authy](https://www.authy.com/) or [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator).

Note that AWS only allows a single MFA device per account. This means that if you choose to use MFA on your root account,
you should save the initializing QR code along with the password! Otherwise, you may need to contact AWS to restore access
to your account. Another alternative is to initialize more than one device against the same MFA code.

Or for some interesting possibilities, see the Authy article around ["multi multi-factor" authentication](https://www.authy.com/blog/multi-multi-factor-authentication).

## Background Information

### What is IAM?

AWS Identity and Access Management (IAM) is a set of features in every AWS account that can be used to manage and secure
human users, human groups, and AWS Resources.

#### IAM Users

Human users access the AWS Web Console or AWS API as **IAM Users.** Usually, an IAM User corresponds to a single human,
but sometimes you create IAM Users for machines, like a `circleci` IAM User.

It's convenient to be able to differentiate between different types of IAM Users, so we recommend using some kind of
common prefix for different IAM User types. For example:

*   `jane.doe` (an employee of your org)
*   `_machine.jenkins` (perhaps machine users are denoted with a `_`)
*   `_contractor.john.doe` (contractors are called out explicitly)

IAM Users can assert their permissions via the AWS Web Console or AWS API. The [awscli](https://aws.amazon.com/cli/) and
various AWS SDKs all just implement performant ways of connecting to the AWS API.

#### IAM Policies

Once you've created an IAM User, that user has no permissions to do anything. You must grant that user specific permissions
by attaching one or more **IAM Policies**.

An IAM Policy is simply a JSON document that declares a set of permissions. For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:*",
        "lambda:*",
        "ec2:*"
      ],
      "Resource": "*"
    }
  ]
}
```

This particular IAM Policy "Allows" all permissions on all `rds`, `lambda` and `ec2` resources.

Each AWS resource type has a set of IAM permissions associated with it. For example, for EC2 Instances, some of the IAM
permissions include:

*   `ec2:CreateTags`
*   `ec2:DeleteTags`
*   `ec2:StartInstances`
*   `ec2:StopInstances`

So in the above example IAM Policy, the action `ec2:*` actually says that this Policy grants *all* permissions on EC2
Resources. It could have granted this permission only to certain EC2 Instances, but thanks to `Resource: "*"`, this
permission applies to all EC2 resources.

For more on IAM Policies, see the [official docs](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).

#### IAM Groups

You might be tempted to directly attach permissions to IAM Users, but it's a best practice to instead grant permissions
through **IAM Groups** by adding IAM Users to one or more IAM Groups.

Using IAM Groups means keeping track of permissions on a small number of groups, rather than a potentially large number of
IAM Users.

#### IAM Roles

Sometimes AWS resources themselves need permissions on other AWS resources. For example, an EC2 Instance or Lambda Function
might need to access a file in an S3 Bucket. While you could hard-code your IAM User credentials in these resources,
hard-coding credentials anywhere is almost always a bad idea since they are now discoverable, non-auditable, and more
likely to leak.

Fortunately, AWS provides an alternative, **IAM Roles.** IAM Roles can be granted permissions via IAM Policies, just
like with IAM Users and IAM Groups. In addition, an AWS Resource can "assume" an IAM Role and inherit all its permissions.
The process of assuming an IAM Role is handled transparently and securely by AWS.

### The Three Levels of IAM Permissions

Why do we have a `use-existing-iam-roles` IAM Group? It's because it represents an "intermediate" level of permissions
on the AWS account. So what's an "intermediate" level of permissions?

A key insight in configuring IAM Policies is that **an IAM User who has permission to create other permissions can give
herself any arbitrary permissions and thereby become the equivalent of an admin user.** For this reason, we must limit
the permission to create permissions.

The following hierarchy is a conceptual model that proposes one such way. Consider this a way of thinking about IAM
Permissions, not an exact prescription for implementation:

1.  **Full IAM Permissions** -- This user is equivalent to root and can do anything in the AWS account, including creating
    new IAM Roles.

    *Corresponds to the "admin" IAM Group above.*

2.  **Leverage Existing IAM Roles** -- This user cannot create a *new* IAM Role, but can leverage *existing* IAM Roles
    when launching AWS resources like an EC2 Instance, Lambda job, or ECS Task.

    For example, when launching an EC2 Instance, this user can't create her own IAM Role for that EC2 Instance, but she
    can choose among existing IAM Roles. Presumably, no IAM Role would itself have the ability to create permissions.

    *Corresponds to any non-admin IAM Group plus the "use-existing-iam-roles" group above. For example, an IAM User would
    belong both to an IAM Group that grants certain permissions (e.g. launch EC2 Instances) and also to the "use-existing-iam-role"
    group.*

3.  **Leverage No IAM Roles at All** -- This user cannot pass any IAM Roles to any AWS resources, but may have other
    permissions with respect to AWS resources granted by other IAM Policies or IAM Groups.

    *Corresponds to an IAM User belonging to a custom IAM Group an organization might create *without* also belonging
    to the "use-existing-iam-roles" group above.*

What this model tells us is that all IAM Users must fall into one of these three categories. As an example, if an IAM
User requires the ability to define IAM Roles as part of her job, there's no point limiting this IAM User's permissions.
Instead, just consider them an admin user.

### How do you know what to include in an IAM Policy?

We use a combination of our own personal experience and the [AWS Managed Policies for Job Functions](https://aws.amazon.com/blogs/security/how-to-assign-permissions-using-new-aws-managed-policies-for-job-functions/)
as a reference. Note that none of the AWS Managed Policies allows us to directly specify a `condition` property, which
means we can't enforce multi-factor authentication (MFA) on these policies. As a result, we've created our own policies,
written automated tests for them, and of course will continue to maintain them over time.

### Gotcha's

#### Avoid the Terraform resource `aws_iam_policy_attachment`

Be very careful about using the [aws.aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html)
Terraform resource. Using this resource with a Managed IAM Policy will remove any other IAM Users, IAM Groups, or IAM
Roles that have attached that Managed Policy.

Instead, use these Terraform resources so you don't have to worry about this problem:

*   [aws_iam_group_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_group_policy_attachment.html)
*   [aws_iam_role_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_role_policy_attachment.html)
*   [aws_iam_user_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_user_policy_attachment.html)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-POLICIES MODULE
# ------------------------------------------------------------------------------------------------------

module "iam_policies" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-policies?ref=v0.75.18"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs from other AWS accounts that will be allowed to access
  # this account.
  allow_access_from_other_account_arns = []

  # A flag to indicate if access will be delegated to SAML providers. The ARNs
  # of the specific IdPs to trust are specified through the
  # allow_access_from_saml_arns variable below. 
  allow_access_from_saml = false

  # A list of IAM Identity Provider ARNs that access to this account will be
  # delegated to. This variable is only used if allow_access_from_saml is true.
  allow_access_from_saml_arns = []

  # A map of lists of IAM roles in other accounts that IAM users in this account
  # should be able to assume. Use group names as keys, and a corresponding list
  # of roles for that group as the value. One IAM policy allowing sts:AssumeRole
  # will be created for each key. If the corresponding list has more than one
  # ARN, the policy will be created with AssumeRole permission for each ARN in
  # the list.
  allow_access_to_other_account_arns = {}

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs
  # policy will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # A list of IAM permissions to grant to developers. For example,
  # ['s3:PutObject', 'sns'] would grant 'PutObject' permissions for S3, and '*'
  # permissions for sns. See https://goo.gl/ZyoHlz to find the IAM Service name.
  # Do NOT add 'iam' to the list of services, or that will grant developers de
  # facto admin access!
  dev_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  dev_s3_bucket_prefix = "your-org-name.user-"

  # If set to true, all the Policies created by this module that are used to
  # grant IAM permissions will require an MFA Token to be present. Use
  # var.trust_policy_should_require_mfa to require MFA for IAM Role Trust
  # Policies.
  iam_policy_should_require_mfa = true

  # If set to true, all the Policies created by this module that are used as
  # Trust Policies for IAM Roles (this that allow sts:AssumeRole) will require
  # an MFA Token to be present to assume that IAM Role. Use
  # var.iam_policy_should_require_mfa to require MFA for all other types of
  # Policies.
  trust_policy_should_require_mfa = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-POLICIES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-policies?ref=v0.75.18"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs from other AWS accounts that will be allowed to access
  # this account.
  allow_access_from_other_account_arns = []

  # A flag to indicate if access will be delegated to SAML providers. The ARNs
  # of the specific IdPs to trust are specified through the
  # allow_access_from_saml_arns variable below. 
  allow_access_from_saml = false

  # A list of IAM Identity Provider ARNs that access to this account will be
  # delegated to. This variable is only used if allow_access_from_saml is true.
  allow_access_from_saml_arns = []

  # A map of lists of IAM roles in other accounts that IAM users in this account
  # should be able to assume. Use group names as keys, and a corresponding list
  # of roles for that group as the value. One IAM policy allowing sts:AssumeRole
  # will be created for each key. If the corresponding list has more than one
  # ARN, the policy will be created with AssumeRole permission for each ARN in
  # the list.
  allow_access_to_other_account_arns = {}

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs
  # policy will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # A list of IAM permissions to grant to developers. For example,
  # ['s3:PutObject', 'sns'] would grant 'PutObject' permissions for S3, and '*'
  # permissions for sns. See https://goo.gl/ZyoHlz to find the IAM Service name.
  # Do NOT add 'iam' to the list of services, or that will grant developers de
  # facto admin access!
  dev_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  dev_s3_bucket_prefix = "your-org-name.user-"

  # If set to true, all the Policies created by this module that are used to
  # grant IAM permissions will require an MFA Token to be present. Use
  # var.trust_policy_should_require_mfa to require MFA for IAM Role Trust
  # Policies.
  iam_policy_should_require_mfa = true

  # If set to true, all the Policies created by this module that are used as
  # Trust Policies for IAM Roles (this that allow sts:AssumeRole) will require
  # an MFA Token to be present to assume that IAM Role. Use
  # var.iam_policy_should_require_mfa to require MFA for all other types of
  # Policies.
  trust_policy_should_require_mfa = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AWS Account.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed to access this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_access_from_saml" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if access will be delegated to SAML providers. The ARNs of the specific IdPs to trust are specified through the allow_access_from_saml_arns variable below. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_access_from_saml_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM Identity Provider ARNs that access to this account will be delegated to. This variable is only used if allow_access_from_saml is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:saml-provider/Google"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_access_to_other_account_arns" requirement="optional" type="map(list(…))">
<HclListItemDescription>

A map of lists of IAM roles in other accounts that IAM users in this account should be able to assume. Use group names as keys, and a corresponding list of roles for that group as the value. One IAM policy allowing sts:AssumeRole will be created for each key. If the corresponding list has more than one ARN, the policy will be created with AssumeRole permission for each ARN in the list.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = {
     group1 = ["arn:aws:iam::123445678910:role/mgmt-full-access"],
     group2 = ["arn:aws:iam::9876543210:role/prod-read-only-access"],
     group3 = [
        "arn:aws:iam::9876543210:role/prod-read-only-ec2-access",
        "arn:aws:iam::9876543210:role/prod-read-only-rds-access"
     ]
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_auto_deploy_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:role/jenkins"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) which will be granted for automated deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs policy will include permissions to decrypt using this CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dev_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions to grant to developers. For example, ['s3:PutObject', 'sns'] would grant 'PutObject' permissions for S3, and '*' permissions for sns. See https://goo.gl/ZyoHlz to find the IAM Service name. Do NOT add 'iam' to the list of services, or that will grant developers de facto admin access!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="dev_s3_bucket_prefix" requirement="optional" type="string">
<HclListItemDescription>

The prefix of the S3 Bucket Name to which an individual IAM User will have full access. For example, if the prefix is acme.user-, then IAM User john.doe will have access to S3 Bucket acme.user-john.doe.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;your-org-name.user-&quot;"/>
</HclListItem>

<HclListItem name="iam_policy_should_require_mfa" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, all the Policies created by this module that are used to grant IAM permissions will require an MFA Token to be present. Use <a href="#trust_policy_should_require_mfa"><code>trust_policy_should_require_mfa</code></a> to require MFA for IAM Role Trust Policies.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="trust_policy_should_require_mfa" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, all the Policies created by this module that are used as Trust Policies for IAM Roles (this that allow sts:AssumeRole) will require an MFA Token to be present to assume that IAM Role. Use <a href="#iam_policy_should_require_mfa"><code>iam_policy_should_require_mfa</code></a> to require MFA for all other types of Policies.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allow_access_from_other_accounts">
</HclListItem>

<HclListItem name="allow_access_to_all_other_accounts">
</HclListItem>

<HclListItem name="allow_access_to_other_accounts">
</HclListItem>

<HclListItem name="allow_auto_deploy_from_other_accounts">
</HclListItem>

<HclListItem name="auto_deploy_permissions">
</HclListItem>

<HclListItem name="billing">
</HclListItem>

<HclListItem name="developers">
</HclListItem>

<HclListItem name="developers_s3_bucket">
</HclListItem>

<HclListItem name="full_access">
</HclListItem>

<HclListItem name="iam_admin">
</HclListItem>

<HclListItem name="iam_user_self_mgmt">
</HclListItem>

<HclListItem name="logs">
</HclListItem>

<HclListItem name="read_only">
</HclListItem>

<HclListItem name="require_mfa_policy">
</HclListItem>

<HclListItem name="ssh_grunt_permissions">
</HclListItem>

<HclListItem name="support">
</HclListItem>

<HclListItem name="use_existing_iam_roles">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/iam-policies/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/iam-policies/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/iam-policies/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7bbe4b2a581be2d874e34966134154a6"
}
##DOCS-SOURCER-END -->
