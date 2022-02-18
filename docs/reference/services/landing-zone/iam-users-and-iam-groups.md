---
title: IAM Users and IAM Groups
hide_title: true
type: service
name: IAM Users and IAM Groups
description: Convenient service for managing best practices set of IAM Groups for permissions management, and configuring IAM Users that take advantage of those groups.
category: landing-zone
cloud: aws
tags: ["aws-landing-zone", "logging", "security"]
license: gruntwork
built-with: terraform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.76.0"/>

# IAM Users and IAM Groups

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/iam-users-and-groups" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone/iam-users-and-groups" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>




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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing/landingzone folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing/landingzone): The
    `examples/for-learning-and-testing/landingzone` folder contains standalone sample code optimized for learning,
    experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="auto_deploy_permissions" className="snap-top"></a>

* [**`auto_deploy_permissions`**](#auto_deploy_permissions) &mdash; A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If [`should_create_iam_group_auto_deploy`](#should_create_iam_group_auto_deploy) is true, the list must have at least one element (e.g. '*').

<a name="aws_account_id" className="snap-top"></a>

* [**`aws_account_id`**](#aws_account_id) &mdash; The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

<a name="cloudtrail_kms_key_arn" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn`**](#cloudtrail_kms_key_arn) &mdash; The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group will include permissions to decrypt using this CMK.

<a name="cross_account_access_all_group_name" className="snap-top"></a>

* [**`cross_account_access_all_group_name`**](#cross_account_access_all_group_name) &mdash; The name of the IAM group that will grant access to all external AWS accounts in [`iam_groups_for_cross_account_access`](#iam_groups_for_cross_account_access).

<a name="enable_iam_groups" className="snap-top"></a>

* [**`enable_iam_groups`**](#enable_iam_groups) &mdash; A feature flag to enable or disable the IAM Groups module.

<a name="force_destroy_users" className="snap-top"></a>

* [**`force_destroy_users`**](#force_destroy_users) &mdash; When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without [`force_destroy`](#force_destroy) a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

<a name="iam_group_developers_permitted_services" className="snap-top"></a>

* [**`iam_group_developers_permitted_services`**](#iam_group_developers_permitted_services) &mdash; A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

<a name="iam_group_name_auto_deploy" className="snap-top"></a>

* [**`iam_group_name_auto_deploy`**](#iam_group_name_auto_deploy) &mdash; The name of the IAM Group that allows automated deployment by graning the permissions specified in [`auto_deploy_permissions`](#auto_deploy_permissions).

<a name="iam_group_name_billing" className="snap-top"></a>

* [**`iam_group_name_billing`**](#iam_group_name_billing) &mdash; The name to be used for the IAM Group that grants read/write access to all billing features in AWS.

<a name="iam_group_name_developers" className="snap-top"></a>

* [**`iam_group_name_developers`**](#iam_group_name_developers) &mdash; The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.

<a name="iam_group_name_full_access" className="snap-top"></a>

* [**`iam_group_name_full_access`**](#iam_group_name_full_access) &mdash; The name to be used for the IAM Group that grants full access to all AWS resources.

<a name="iam_group_name_houston_cli" className="snap-top"></a>

* [**`iam_group_name_houston_cli`**](#iam_group_name_houston_cli) &mdash; The name of the IAM Group that allows access to houston CLI.

<a name="iam_group_name_iam_admin" className="snap-top"></a>

* [**`iam_group_name_iam_admin`**](#iam_group_name_iam_admin) &mdash; The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.

<a name="iam_group_name_iam_user_self_mgmt" className="snap-top"></a>

* [**`iam_group_name_iam_user_self_mgmt`**](#iam_group_name_iam_user_self_mgmt) &mdash; The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.

<a name="iam_group_name_logs" className="snap-top"></a>

* [**`iam_group_name_logs`**](#iam_group_name_logs) &mdash; The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.

<a name="iam_group_name_read_only" className="snap-top"></a>

* [**`iam_group_name_read_only`**](#iam_group_name_read_only) &mdash; The name to be used for the IAM Group that grants read-only access to all AWS resources.

<a name="iam_group_name_support" className="snap-top"></a>

* [**`iam_group_name_support`**](#iam_group_name_support) &mdash; The name of the IAM Group that allows access to AWS Support.

<a name="iam_group_name_use_existing_iam_roles" className="snap-top"></a>

* [**`iam_group_name_use_existing_iam_roles`**](#iam_group_name_use_existing_iam_roles) &mdash; The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.

<a name="iam_group_names_ssh_grunt_sudo_users" className="snap-top"></a>

* [**`iam_group_names_ssh_grunt_sudo_users`**](#iam_group_names_ssh_grunt_sudo_users) &mdash; The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

<a name="iam_group_names_ssh_grunt_users" className="snap-top"></a>

* [**`iam_group_names_ssh_grunt_users`**](#iam_group_names_ssh_grunt_users) &mdash; The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

<a name="iam_groups_for_cross_account_access" className="snap-top"></a>

* [**`iam_groups_for_cross_account_access`**](#iam_groups_for_cross_account_access) &mdash; This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields [`'group_name`](#'group_name)', which will be used as the name of the IAM group, and [`'iam_role_arns`](#'iam_role_arns)', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).

<a name="iam_policy_iam_user_self_mgmt" className="snap-top"></a>

* [**`iam_policy_iam_user_self_mgmt`**](#iam_policy_iam_user_self_mgmt) &mdash; The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.

<a name="iam_role_tags" className="snap-top"></a>

* [**`iam_role_tags`**](#iam_role_tags) &mdash; The tags to apply to all the IAM role resources.

<a name="max_session_duration_human_users" className="snap-top"></a>

* [**`max_session_duration_human_users`**](#max_session_duration_human_users) &mdash; The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see [`max_session_duration_machine_users`](#max_session_duration_machine_users).

<a name="max_session_duration_machine_users" className="snap-top"></a>

* [**`max_session_duration_machine_users`**](#max_session_duration_machine_users) &mdash; The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see [`max_session_duration_human_users`](#max_session_duration_human_users).

<a name="minimum_password_length" className="snap-top"></a>

* [**`minimum_password_length`**](#minimum_password_length) &mdash; Password minimum length.

<a name="password_reset_required" className="snap-top"></a>

* [**`password_reset_required`**](#password_reset_required) &mdash; Force the user to reset their password on initial login. Only used for users with [`create_login_profile`](#create_login_profile) set to true.

<a name="should_create_iam_group_auto_deploy" className="snap-top"></a>

* [**`should_create_iam_group_auto_deploy`**](#should_create_iam_group_auto_deploy) &mdash; Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in [`auto_deploy_permissions`](#auto_deploy_permissions). (true or false)

<a name="should_create_iam_group_billing" className="snap-top"></a>

* [**`should_create_iam_group_billing`**](#should_create_iam_group_billing) &mdash; Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)

<a name="should_create_iam_group_cross_account_access_all" className="snap-top"></a>

* [**`should_create_iam_group_cross_account_access_all`**](#should_create_iam_group_cross_account_access_all) &mdash; Should we create the IAM Group for access to all external AWS accounts? 

<a name="should_create_iam_group_developers" className="snap-top"></a>

* [**`should_create_iam_group_developers`**](#should_create_iam_group_developers) &mdash; Should we create the IAM Group for developers? The permissions of that group are specified via [`iam_group_developers_permitted_services`](#iam_group_developers_permitted_services). (true or false)

<a name="should_create_iam_group_full_access" className="snap-top"></a>

* [**`should_create_iam_group_full_access`**](#should_create_iam_group_full_access) &mdash; Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

<a name="should_create_iam_group_houston_cli_users" className="snap-top"></a>

* [**`should_create_iam_group_houston_cli_users`**](#should_create_iam_group_houston_cli_users) &mdash; Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.

<a name="should_create_iam_group_iam_admin" className="snap-top"></a>

* [**`should_create_iam_group_iam_admin`**](#should_create_iam_group_iam_admin) &mdash; Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)

<a name="should_create_iam_group_logs" className="snap-top"></a>

* [**`should_create_iam_group_logs`**](#should_create_iam_group_logs) &mdash; Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If [`cloudtrail_kms_key_arn`](#cloudtrail_kms_key_arn) is set, will also give decrypt access to a KMS CMK. (true or false)

<a name="should_create_iam_group_read_only" className="snap-top"></a>

* [**`should_create_iam_group_read_only`**](#should_create_iam_group_read_only) &mdash; Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

<a name="should_create_iam_group_support" className="snap-top"></a>

* [**`should_create_iam_group_support`**](#should_create_iam_group_support) &mdash; Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)

<a name="should_create_iam_group_use_existing_iam_roles" className="snap-top"></a>

* [**`should_create_iam_group_use_existing_iam_roles`**](#should_create_iam_group_use_existing_iam_roles) &mdash; Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)

<a name="should_create_iam_group_user_self_mgmt" className="snap-top"></a>

* [**`should_create_iam_group_user_self_mgmt`**](#should_create_iam_group_user_self_mgmt) &mdash; Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)

<a name="should_require_mfa" className="snap-top"></a>

* [**`should_require_mfa`**](#should_require_mfa) &mdash; Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

<a name="users" className="snap-top"></a>

* [**`users`**](#users) &mdash; A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), [`'pgp_key`](#'pgp_key)' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if [`create_login_profile`](#create_login_profile) or [`create_access_keys`](#create_access_keys) is true), [`'create_login_profile`](#'create_login_profile)' (if set to true, create a password to login to the AWS Web Console), [`'create_access_keys`](#'create_access_keys)' (if set to true, create access keys for the user), 'path' (the path), and [`'permissions_boundary`](#'permissions_boundary)' (the ARN of the policy that is used to set the permissions boundary for the user).

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="billing_iam_group_arn" className="snap-top"></a>

* [**`billing_iam_group_arn`**](#billing_iam_group_arn) &mdash; 

<a name="billing_iam_group_name" className="snap-top"></a>

* [**`billing_iam_group_name`**](#billing_iam_group_name) &mdash; 

<a name="cross_account_access_all_group_arn" className="snap-top"></a>

* [**`cross_account_access_all_group_arn`**](#cross_account_access_all_group_arn) &mdash; 

<a name="cross_account_access_all_group_name" className="snap-top"></a>

* [**`cross_account_access_all_group_name`**](#cross_account_access_all_group_name) &mdash; 

<a name="cross_account_access_group_arns" className="snap-top"></a>

* [**`cross_account_access_group_arns`**](#cross_account_access_group_arns) &mdash; 

<a name="cross_account_access_group_names" className="snap-top"></a>

* [**`cross_account_access_group_names`**](#cross_account_access_group_names) &mdash; 

<a name="developers_iam_group_arn" className="snap-top"></a>

* [**`developers_iam_group_arn`**](#developers_iam_group_arn) &mdash; 

<a name="developers_iam_group_name" className="snap-top"></a>

* [**`developers_iam_group_name`**](#developers_iam_group_name) &mdash; 

<a name="full_access_iam_group_arn" className="snap-top"></a>

* [**`full_access_iam_group_arn`**](#full_access_iam_group_arn) &mdash; 

<a name="full_access_iam_group_name" className="snap-top"></a>

* [**`full_access_iam_group_name`**](#full_access_iam_group_name) &mdash; 

<a name="houston_cli_users_iam_group_arn" className="snap-top"></a>

* [**`houston_cli_users_iam_group_arn`**](#houston_cli_users_iam_group_arn) &mdash; 

<a name="houston_cli_users_iam_group_name" className="snap-top"></a>

* [**`houston_cli_users_iam_group_name`**](#houston_cli_users_iam_group_name) &mdash; 

<a name="iam_admin_iam_group_arn" className="snap-top"></a>

* [**`iam_admin_iam_group_arn`**](#iam_admin_iam_group_arn) &mdash; 

<a name="iam_admin_iam_group_name" className="snap-top"></a>

* [**`iam_admin_iam_group_name`**](#iam_admin_iam_group_name) &mdash; 

<a name="iam_admin_iam_policy_arn" className="snap-top"></a>

* [**`iam_admin_iam_policy_arn`**](#iam_admin_iam_policy_arn) &mdash; 

<a name="iam_self_mgmt_iam_group_arn" className="snap-top"></a>

* [**`iam_self_mgmt_iam_group_arn`**](#iam_self_mgmt_iam_group_arn) &mdash; 

<a name="iam_self_mgmt_iam_group_name" className="snap-top"></a>

* [**`iam_self_mgmt_iam_group_name`**](#iam_self_mgmt_iam_group_name) &mdash; 

<a name="iam_self_mgmt_iam_policy_arn" className="snap-top"></a>

* [**`iam_self_mgmt_iam_policy_arn`**](#iam_self_mgmt_iam_policy_arn) &mdash; 

<a name="logs_iam_group_arn" className="snap-top"></a>

* [**`logs_iam_group_arn`**](#logs_iam_group_arn) &mdash; 

<a name="logs_iam_group_name" className="snap-top"></a>

* [**`logs_iam_group_name`**](#logs_iam_group_name) &mdash; 

<a name="read_only_iam_group_arn" className="snap-top"></a>

* [**`read_only_iam_group_arn`**](#read_only_iam_group_arn) &mdash; 

<a name="read_only_iam_group_name" className="snap-top"></a>

* [**`read_only_iam_group_name`**](#read_only_iam_group_name) &mdash; 

<a name="require_mfa_policy" className="snap-top"></a>

* [**`require_mfa_policy`**](#require_mfa_policy) &mdash; 

<a name="ssh_grunt_sudo_users_group_arns" className="snap-top"></a>

* [**`ssh_grunt_sudo_users_group_arns`**](#ssh_grunt_sudo_users_group_arns) &mdash; 

<a name="ssh_grunt_sudo_users_group_names" className="snap-top"></a>

* [**`ssh_grunt_sudo_users_group_names`**](#ssh_grunt_sudo_users_group_names) &mdash; 

<a name="ssh_grunt_users_group_arns" className="snap-top"></a>

* [**`ssh_grunt_users_group_arns`**](#ssh_grunt_users_group_arns) &mdash; 

<a name="ssh_grunt_users_group_names" className="snap-top"></a>

* [**`ssh_grunt_users_group_names`**](#ssh_grunt_users_group_names) &mdash; 

<a name="support_iam_group_arn" className="snap-top"></a>

* [**`support_iam_group_arn`**](#support_iam_group_arn) &mdash; 

<a name="support_iam_group_name" className="snap-top"></a>

* [**`support_iam_group_name`**](#support_iam_group_name) &mdash; 

<a name="use_existing_iam_roles_iam_group_arn" className="snap-top"></a>

* [**`use_existing_iam_roles_iam_group_arn`**](#use_existing_iam_roles_iam_group_arn) &mdash; 

<a name="use_existing_iam_roles_iam_group_name" className="snap-top"></a>

* [**`use_existing_iam_roles_iam_group_name`**](#use_existing_iam_roles_iam_group_name) &mdash; 

<a name="user_access_keys" className="snap-top"></a>

* [**`user_access_keys`**](#user_access_keys) &mdash; A map of usernames to that user's access keys (a map with keys [`access_key_id`](#access_key_id) and [`secret_access_key`](#secret_access_key)), with the [`secret_access_key`](#secret_access_key) encrypted with that user's PGP key (only shows up for users with [`create_access_keys`](#create_access_keys) = true). You can decrypt the [`secret_access_key`](#secret_access_key) on the CLI: echo [`&lt;secret_access_key`](#&lt;secret_access_key)> | base64 --decode | keybase pgp decrypt

<a name="user_arns" className="snap-top"></a>

* [**`user_arns`**](#user_arns) &mdash; A map of usernames to the ARN for that IAM user.

<a name="user_passwords" className="snap-top"></a>

* [**`user_passwords`**](#user_passwords) &mdash; A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with [`create_login_profile`](#create_login_profile) = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"2a38541847881c560f26c0f59d9999ff"}
##DOCS-SOURCER-END -->
