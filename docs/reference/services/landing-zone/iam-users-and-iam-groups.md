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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.50.2"/>

# IAM Users and IAM Groups


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/iam-users-and-groups" className="link-button">View Source</a>

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

<br/>

### Required

<HclListItem name="aws_account_id" requirement="required" description="The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables." type="string"/>


<br/>


### Optional

<HclListItem name="auto_deploy_permissions" requirement="optional" description="A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If <a href=#should_create_iam_group_auto_deploy><code>should_create_iam_group_auto_deploy</code></a> is true, the list must have at least one element (e.g. '*')." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" description="The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group will include permissions to decrypt using this CMK." type="string" defaultValue="null"/>

<HclListItem name="cross_account_access_all_group_name" requirement="optional" description="The name of the IAM group that will grant access to all external AWS accounts in <a href=#iam_groups_for_cross_account_access><code>iam_groups_for_cross_account_access</code></a>." type="string" defaultValue="_all-accounts"/>

<HclListItem name="enable_iam_groups" requirement="optional" description="A feature flag to enable or disable the IAM Groups module." type="bool" defaultValue="true"/>

<HclListItem name="force_destroy_users" requirement="optional" description="When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without <a href=#force_destroy><code>force_destroy</code></a> a user with non-Terraform-managed access keys and login profile will fail to be destroyed." type="bool" defaultValue="false"/>

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" description="A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="iam_group_name_auto_deploy" requirement="optional" description="The name of the IAM Group that allows automated deployment by graning the permissions specified in <a href=#auto_deploy_permissions><code>auto_deploy_permissions</code></a>." type="string" defaultValue="_machine.ecs-auto-deploy"/>

<HclListItem name="iam_group_name_billing" requirement="optional" description="The name to be used for the IAM Group that grants read/write access to all billing features in AWS." type="string" defaultValue="billing"/>

<HclListItem name="iam_group_name_developers" requirement="optional" description="The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers." type="string" defaultValue="developers"/>

<HclListItem name="iam_group_name_full_access" requirement="optional" description="The name to be used for the IAM Group that grants full access to all AWS resources." type="string" defaultValue="full-access"/>

<HclListItem name="iam_group_name_houston_cli" requirement="optional" description="The name of the IAM Group that allows access to houston CLI." type="string" defaultValue="houston-cli-users"/>

<HclListItem name="iam_group_name_iam_admin" requirement="optional" description="The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access." type="string" defaultValue="iam-admin"/>

<HclListItem name="iam_group_name_iam_user_self_mgmt" requirement="optional" description="The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account." type="string" defaultValue="iam-user-self-mgmt"/>

<HclListItem name="iam_group_name_logs" requirement="optional" description="The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS." type="string" defaultValue="logs"/>

<HclListItem name="iam_group_name_read_only" requirement="optional" description="The name to be used for the IAM Group that grants read-only access to all AWS resources." type="string" defaultValue="read-only"/>

<HclListItem name="iam_group_name_support" requirement="optional" description="The name of the IAM Group that allows access to AWS Support." type="string" defaultValue="support"/>

<HclListItem name="iam_group_name_use_existing_iam_roles" requirement="optional" description="The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles." type="string" defaultValue="use-existing-iam-roles"/>

<HclListItem name="iam_group_names_ssh_grunt_sudo_users" requirement="optional" description="The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups." type="list" typeDetails="list(string)" defaultValue="['ssh-grunt-sudo-users']"/>

<HclListItem name="iam_group_names_ssh_grunt_users" requirement="optional" description="The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups." type="list" typeDetails="list(string)" defaultValue="['ssh-grunt-users']"/>

<HclListItem name="iam_groups_for_cross_account_access" requirement="optional" description="This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields '<a href=#group_name><code>group_name</code></a>', which will be used as the name of the IAM group, and '<a href=#iam_role_arns><code>iam_role_arns</code></a>', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts)." type="list" typeDetails="list(object({
    group_name    = string
    iam_role_arns = list(string)
  }))" defaultValue="[]"/>

<HclListItem name="iam_policy_iam_user_self_mgmt" requirement="optional" description="The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account." type="string" defaultValue="iam-user-self-mgmt"/>

<HclListItem name="iam_role_tags" requirement="optional" description="The tags to apply to all the IAM role resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="max_session_duration_human_users" requirement="optional" description="The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href=#max_session_duration_machine_users><code>max_session_duration_machine_users</code></a>." type="number" defaultValue="43200"/>

<HclListItem name="max_session_duration_machine_users" requirement="optional" description="The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href=#max_session_duration_human_users><code>max_session_duration_human_users</code></a>." type="number" defaultValue="3600"/>

<HclListItem name="minimum_password_length" requirement="optional" description="Password minimum length." type="number" defaultValue="16"/>

<HclListItem name="password_reset_required" requirement="optional" description="Force the user to reset their password on initial login. Only used for users with <a href=#create_login_profile><code>create_login_profile</code></a> set to true." type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_auto_deploy" requirement="optional" description="Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in <a href=#auto_deploy_permissions><code>auto_deploy_permissions</code></a>. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_billing" requirement="optional" description="Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_cross_account_access_all" requirement="optional" description="Should we create the IAM Group for access to all external AWS accounts? " type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_developers" requirement="optional" description="Should we create the IAM Group for developers? The permissions of that group are specified via <a href=#iam_group_developers_permitted_services><code>iam_group_developers_permitted_services</code></a>. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_full_access" requirement="optional" description="Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_houston_cli_users" requirement="optional" description="Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services." type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_iam_admin" requirement="optional" description="Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_logs" requirement="optional" description="Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If <a href=#cloudtrail_kms_key_arn><code>cloudtrail_kms_key_arn</code></a> is set, will also give decrypt access to a KMS CMK. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" description="Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_support" requirement="optional" description="Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_use_existing_iam_roles" requirement="optional" description="Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_user_self_mgmt" requirement="optional" description="Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="should_require_mfa" requirement="optional" description="Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="users" requirement="optional" description="A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), '<a href=#pgp_key><code>pgp_key</code></a>' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if <a href=#create_login_profile><code>create_login_profile</code></a> or <a href=#create_access_keys><code>create_access_keys</code></a> is true), '<a href=#create_login_profile><code>create_login_profile</code></a>' (if set to true, create a password to login to the AWS Web Console), '<a href=#create_access_keys><code>create_access_keys</code></a>' (if set to true, create access keys for the user), 'path' (the path), and '<a href=#permissions_boundary><code>permissions_boundary</code></a>' (the ARN of the policy that is used to set the permissions boundary for the user)." type="any" defaultValue="{}"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="billing_iam_group_arn" requirement="required"/>

<HclListItem name="billing_iam_group_name" requirement="required"/>

<HclListItem name="cross_account_access_all_group_arn" requirement="required"/>

<HclListItem name="cross_account_access_all_group_name" requirement="required"/>

<HclListItem name="cross_account_access_group_arns" requirement="required"/>

<HclListItem name="cross_account_access_group_names" requirement="required"/>

<HclListItem name="developers_iam_group_arn" requirement="required"/>

<HclListItem name="developers_iam_group_name" requirement="required"/>

<HclListItem name="full_access_iam_group_arn" requirement="required"/>

<HclListItem name="full_access_iam_group_name" requirement="required"/>

<HclListItem name="houston_cli_users_iam_group_arn" requirement="required"/>

<HclListItem name="houston_cli_users_iam_group_name" requirement="required"/>

<HclListItem name="iam_admin_iam_group_arn" requirement="required"/>

<HclListItem name="iam_admin_iam_group_name" requirement="required"/>

<HclListItem name="iam_admin_iam_policy_arn" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_group_arn" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_group_name" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_policy_arn" requirement="required"/>

<HclListItem name="logs_iam_group_arn" requirement="required"/>

<HclListItem name="logs_iam_group_name" requirement="required"/>

<HclListItem name="read_only_iam_group_arn" requirement="required"/>

<HclListItem name="read_only_iam_group_name" requirement="required"/>

<HclListItem name="require_mfa_policy" requirement="required"/>

<HclListItem name="ssh_grunt_sudo_users_group_arns" requirement="required"/>

<HclListItem name="ssh_grunt_sudo_users_group_names" requirement="required"/>

<HclListItem name="ssh_grunt_users_group_arns" requirement="required"/>

<HclListItem name="ssh_grunt_users_group_names" requirement="required"/>

<HclListItem name="support_iam_group_arn" requirement="required"/>

<HclListItem name="support_iam_group_name" requirement="required"/>

<HclListItem name="use_existing_iam_roles_iam_group_arn" requirement="required"/>

<HclListItem name="use_existing_iam_roles_iam_group_name" requirement="required"/>

<HclListItem name="user_access_keys" requirement="required" description="A map of usernames to that user's access keys (a map with keys <a href=#access_key_id><code>access_key_id</code></a> and <a href=#secret_access_key><code>secret_access_key</code></a>), with the <a href=#secret_access_key><code>secret_access_key</code></a> encrypted with that user's PGP key (only shows up for users with <a href=#create_access_keys><code>create_access_keys</code></a> = true). You can decrypt the <a href=#secret_access_key><code>secret_access_key</code></a> on the CLI: echo <<a href=#secret_access_key><code>secret_access_key</code></a>> | base64 --decode | keybase pgp decrypt"/>

<HclListItem name="user_arns" requirement="required" description="A map of usernames to the ARN for that IAM user."/>

<HclListItem name="user_passwords" requirement="required" description="A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with <a href=#create_login_profile><code>create_login_profile</code></a> = true). You can decrypt the password on the CLI: echo <password> | base64 --decode | keybase pgp decrypt"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"f45bd135831e81d7f23141a624cd4025"}
##DOCS-SOURCER-END -->
