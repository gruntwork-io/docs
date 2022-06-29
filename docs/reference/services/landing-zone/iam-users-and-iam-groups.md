---
type: "service"
name: "IAM Users and IAM Groups"
description: "Convenient service for managing best practices set of IAM Groups for permissions management, and configuring IAM Users that take advantage of those groups."
category: "landing-zone"
cloud: "aws"
tags: ["aws-landing-zone","logging","security"]
license: "gruntwork"
built-with: "terraform"
title: "IAM Users and IAM Groups"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.92.1" lastModifiedVersion="0.89.4"/>

# IAM Users and IAM Groups


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/modules/landingzone/iam-users-and-groups" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Fiam-users-and-groups" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to provision and manage best practices set of IAM
Groups for permissions management, and configuring IAM Users that take advantage of those groups.

This feature exists in `account-baseline-security`, but having a separate module to manage IAM Users and Groups is
useful for large scale organizations that frequently:

*   Onboard and offboard new users
*   Add and remove AWS accounts in their org

The rationale behind this change comes from addressing two issues:

*   The cadence of changes for IAM users and groups in the security account is considerably higher than the other things
    that are managed in `account-baseline-security` (e.g., consider CloudTrail, which should only be configured once in
    the lifetime of the account).

*   `account-baseline-security` is, by nature, a heavy module that manages tons of resources. Having to go through the
    `plan` and `apply` cycle for all those resources can be very painful, especially for large orgs that need to
    onboard/offboard user frequently.

## Features

*   Provision IAM users with default set of IAM Groups, passwords, and access keys.

*   Manage a best practices set of IAM Groups for managing different permissions levels in your AWS Account.

*   Provision IAM Groups that manage cross account IAM Role access to other accounts in your AWS Organization.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [iam-users module documentation](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-users): Underlying
    module used to manage the IAM Users from this module.
*   [iam-groups module documentation](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-groups): Underlying
    module used to manage the IAM Groups from this module.
*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing/landingzone folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/examples/for-learning-and-testing/landingzone): The
    `examples/for-learning-and-testing/landingzone` folder contains standalone sample code optimized for learning,
    experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If <a href="#should_create_iam_group_auto_deploy"><code>should_create_iam_group_auto_deploy</code></a> is true, the list must have at least one element (e.g. '*').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group will include permissions to decrypt using this CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cross_account_access_all_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM group that will grant access to all external AWS accounts in <a href="#iam_groups_for_cross_account_access"><code>iam_groups_for_cross_account_access</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;_all-accounts&quot;"/>
</HclListItem>

<HclListItem name="enable_iam_groups" requirement="optional" type="bool">
<HclListItemDescription>

A feature flag to enable or disable the IAM Groups module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="force_destroy_users" requirement="optional" type="bool">
<HclListItemDescription>

When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_group_name_auto_deploy" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM Group that allows automated deployment by graning the permissions specified in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;_machine.ecs-auto-deploy&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_billing" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read/write access to all billing features in AWS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;billing&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_developers" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;developers&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_full_access" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants full access to all AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;full-access&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_houston_cli" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM Group that allows access to houston CLI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;houston-cli-users&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_iam_admin" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-admin&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_iam_user_self_mgmt" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-user-self-mgmt&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_logs" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;logs&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_read_only" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read-only access to all AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;read-only&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_support" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM Group that allows access to AWS Support.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;support&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_use_existing_iam_roles" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;use-existing-iam-roles&quot;"/>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_sudo_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ssh-grunt-sudo-users"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ssh-grunt-users"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="iam_groups_for_cross_account_access" requirement="optional" type="list(object(…))">
<HclListItemDescription>

This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    group_name    = string
    iam_role_arns = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_policy_iam_user_self_mgmt" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-user-self-mgmt&quot;"/>
</HclListItem>

<HclListItem name="iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

The tags to apply to all the IAM role resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="max_session_duration_human_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href="#max_session_duration_machine_users"><code>max_session_duration_machine_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="max_session_duration_machine_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href="#max_session_duration_human_users"><code>max_session_duration_human_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="16"/>
</HclListItem>

<HclListItem name="password_reset_required" requirement="optional" type="bool">
<HclListItemDescription>

Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_auto_deploy" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_billing" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_cross_account_access_all" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for access to all external AWS accounts? 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_developers" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for developers? The permissions of that group are specified via <a href="#iam_group_developers_permitted_services"><code>iam_group_developers_permitted_services</code></a>. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_full_access" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_houston_cli_users" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_iam_admin" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_logs" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is set, will also give decrypt access to a KMS CMK. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_support" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_use_existing_iam_roles" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_user_self_mgmt" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_require_mfa" requirement="optional" type="bool">
<HclListItemDescription>

Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="users" requirement="optional" type="any">
<HclListItemDescription>

A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="billing_iam_group_arn">
</HclListItem>

<HclListItem name="billing_iam_group_name">
</HclListItem>

<HclListItem name="cross_account_access_all_group_arn">
</HclListItem>

<HclListItem name="cross_account_access_all_group_name">
</HclListItem>

<HclListItem name="cross_account_access_group_arns">
</HclListItem>

<HclListItem name="cross_account_access_group_names">
</HclListItem>

<HclListItem name="developers_iam_group_arn">
</HclListItem>

<HclListItem name="developers_iam_group_name">
</HclListItem>

<HclListItem name="full_access_iam_group_arn">
</HclListItem>

<HclListItem name="full_access_iam_group_name">
</HclListItem>

<HclListItem name="houston_cli_users_iam_group_arn">
</HclListItem>

<HclListItem name="houston_cli_users_iam_group_name">
</HclListItem>

<HclListItem name="iam_admin_iam_group_arn">
</HclListItem>

<HclListItem name="iam_admin_iam_group_name">
</HclListItem>

<HclListItem name="iam_admin_iam_policy_arn">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_group_arn">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_group_name">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_policy_arn">
</HclListItem>

<HclListItem name="logs_iam_group_arn">
</HclListItem>

<HclListItem name="logs_iam_group_name">
</HclListItem>

<HclListItem name="read_only_iam_group_arn">
</HclListItem>

<HclListItem name="read_only_iam_group_name">
</HclListItem>

<HclListItem name="require_mfa_policy">
</HclListItem>

<HclListItem name="ssh_grunt_sudo_users_group_arns">
</HclListItem>

<HclListItem name="ssh_grunt_sudo_users_group_names">
</HclListItem>

<HclListItem name="ssh_grunt_users_group_arns">
</HclListItem>

<HclListItem name="ssh_grunt_users_group_names">
</HclListItem>

<HclListItem name="support_iam_group_arn">
</HclListItem>

<HclListItem name="support_iam_group_name">
</HclListItem>

<HclListItem name="use_existing_iam_roles_iam_group_arn">
</HclListItem>

<HclListItem name="use_existing_iam_roles_iam_group_name">
</HclListItem>

<HclListItem name="user_access_keys">
<HclListItemDescription>

A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_arns">
<HclListItemDescription>

A map of usernames to the ARN for that IAM user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_passwords">
<HclListItemDescription>

A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/modules%2Flandingzone%2Fiam-users-and-groups%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/modules%2Flandingzone%2Fiam-users-and-groups%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.92.1/modules%2Flandingzone%2Fiam-users-and-groups%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "02268d362195d22eed174c34bab8bdad"
}
##DOCS-SOURCER-END -->
