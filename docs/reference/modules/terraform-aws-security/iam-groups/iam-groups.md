---
title: "A Best-Practices Set of IAM Groups"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.5" lastModifiedVersion="0.69.2"/>

# A Best-Practices Set of IAM Groups

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-groups" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Gruntwork Terraform Module sets up a set of IAM Groups that will make sense for most organizations and attaches to
them a set of IAM Policies (permissions) that make it easier to manage different permissions levels in your AWS account.

If you're not familiar with IAM concepts, start with the [Background Information](#background-information) section as a
way to familiarize yourself with the terminology.

## Motivation

In Summer 2014, a company called CodeSpaces that offered "rock solid, secure, and affordable git hosting and project
management" was forced to shut down after a single rogue employee entered its AWS account and wiped out everything
([See ArsTechnica Article](http://arstechnica.com/security/2014/06/aws-console-breach-leads-to-demise-of-service-with-proven-backup-plan/)).
The goal of this module is to carefully manage access to your AWS account to reduce the chances of rogue employees or
external attackers being able to do too much damage.

## Resources Created

### IAM Groups

This module optionally creates the following IAM Groups:

*   **full-access:** IAM Users in this group have full access to all resources in the AWS account.
*   **billing:** IAM Users in this group can read and write billing settings, but nothing else.
*   **logs:** IAM Users in this group can read logs in CloudTrail, AWS Config, and CloudWatch.
*   **developers:** IAM Users in this group have whatever permissions are declared in
    `var.iam_group_developers_permitted_services`. In addition, these IAM Users have rights to a personal S3 bucket
    named `<var.iam_group_developers_permitted_services><iam-user-name>`.
*   **read-only:** IAM Users in this group can read all resources in the AWS account but have no write privileges.
*   **support:** IAM Users in this group can interact with AWS Support.
*   **iam-user-self-mgmt:** IAM Group with the `iam-user-self-mgmt` IAM Policy attached. IAM Users in this group have
    enough permissions to manage their own account (setup MFA, change passwords, etc), but not other IAM Users.
*   **iam-admin:** IAM Group with the `iam-admin` IAM Policy attached. IAM Users in this group have
    full IAM permissions to administer users, groups, roles, and policies. This is effectively the same as administrative access
    since users can grant arbitrary permissions!
*   **use-existing-iam-roles:** IAM Users in this group can pass *existing* IAM Roles to AWS resources to which they have
    been granted access. These IAM Users cannot create *new* IAM Roles, only use existing ones. See
    [the three levels of IAM permissions](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-policies#the-three-levels-of-iam-permissions) for more information.
*   **ssh-grunt-sudo-users:** IAM Users in this group have SSH access with `sudo` privileges to any EC2 Instance configured
    to use this group to manage SSH logins.
*   **ssh-grunt-users:** IAM Users in this group have SSH access without `sudo` privileges to any EC2 Instance configured
    to use this group to manage SSH logins.
*   **cross-account-access:** IAM users in these groups can assume an IAM role in another AWS account. This makes
    [cross-account access](https://aws.amazon.com/blogs/security/enable-a-new-feature-in-the-aws-management-console-cross-account-access/),
    easy, where you can have all your users defined in one AWS account (e.g. users) and to grant those users access to
    certain IAM roles in other AWS accounts (e.g. stage, prod). The IAM groups that are created and which IAM roles they
    have access to is controlled by the variable `var.iam_groups_for_cross_account_access`.

These represent a standard set of IAM Groups, but your organization may need additional groups. You're welcome to add
additional IAM Groups outside this module to suit your organization's needs. Is the IAM Group you need a Group most
teams would need? Let us know at support@gruntwork.io and maybe we'll consider adding it to the module itself.

### IAM Policies

This module creates the following IAM Policies:

*   **iam-user-self-mgmt:** This IAM Policy grants permission to an IAM User to manage her own IAM User account. This
    includes resetting the IAM User password, and generating AWS account credentials. It also grants permission to list
    other IAM Users, but not to view any information about them.

This IAM Policy should be attached to any IAM Group that does not already grant all IAM permissions. For example, if an
IAM User does not have the ability to pass an IAM Role to an EC2 Instance, that IAM User will be unable to manage his
own account unless this IAM Policy is attached to his account.

## Resources NOT Created

### IAM Users

This module does not create any IAM Users, nor assign any existing IAM Users to IAM Groups. You can use the [iam-users module](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-users) to create users.

### IAM Roles

This module does not create any IAM Roles. Those should be created with Terraform, but in separate templates in the
context of your specific needs, not as a generic set of roles.

## Additional Guidelines

### Enable Your Billing IAM Group

By default, only the root AWS account has access to billing information. To enable the billing IAM Group above or
otherwise enable IAM Users to access the billing console:

1.  Select "My Account" from the top right of the AWS Web Console.

    ![Screenshot](/img/reference/modules/terraform-aws-security/iam-groups/my-account.png)

2.  You'll be taken to the "Dashboard" page. Now scroll down until you see the below heading and check the box:

    ![Screnshot](/img/reference/modules/terraform-aws-security/iam-groups/iam-user-access-to-billing.png)

## Background Information

For background information on IAM, IAM users, IAM policies, and more, check out the [background information docs in
the iam-policies module](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-policies#background-information).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-GROUPS MODULE
# ------------------------------------------------------------------------------------------------------

module "iam_groups" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-groups?ref=v1.0.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group
  # will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "access-all-external-accounts"

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"]. Do NOT add iam to the list of
  # services, or that will grant Developers de facto admin access. If you need
  # to grant iam privileges, just grant the user Full Access.
  iam_group_developers_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  iam_group_developers_s3_bucket_prefix = "your-org-name.user-"

  # The name of the IAM Group that allows automated deployment by graning the
  # permissions specified in var.auto_deploy_permissions.
  iam_group_name_auto_deploy = "_machine.ecs-auto-deploy"

  # The name to be used for the IAM Group that grants read/write access to all
  # billing features in AWS.
  iam_group_name_billing = "billing"

  # The name to be used for the IAM Group that grants IAM Users a reasonable set
  # of permissions for developers.
  iam_group_name_developers = "developers"

  # The name to be used for the IAM Group that grants full access to all AWS
  # resources.
  iam_group_name_full_access = "full-access"

  # The name to be used for the IAM Group that grants IAM administrative access.
  # Effectively grants administrator access.
  iam_group_name_iam_admin = "iam-admin"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_group_name_iam_user_self_mgmt = "iam-user-self-mgmt"

  # The name to be used for the IAM Group that grants read access to CloudTrail,
  # AWS Config, and CloudWatch in AWS.
  iam_group_name_logs = "logs"

  # The name to be used for the IAM Group that grants read-only access to all
  # AWS resources.
  iam_group_name_read_only = "read-only"

  # The name of the IAM Group that allows access to AWS Support.
  iam_group_name_support = "support"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to use existing IAM Roles when launching AWS Resources. This does NOT grant
  # the permission to create new IAM Roles.
  iam_group_name_use_existing_iam_roles = "use-existing-iam-roles"

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = ["ssh-grunt-sudo-users"]

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = ["ssh-grunt-users"]

  # This variable is used to create groups that allow IAM users to assume roles
  # in your other AWS accounts. It should be a list of objects, where each
  # object has the fields 'group_name', which will be used as the name of the
  # IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that
  # you can assume when part of that group. For each entry in the list of
  # objects, we will create an IAM group that allows users to assume the given
  # IAM role(s) in the other AWS account. This allows you to define all your IAM
  # users in one account (e.g. the users account) and to grant them access to
  # certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # The name to be used for the IAM Policy that grants IAM administrative
  # access.
  iam_policy_iam_admin = "iam-admin"

  # The name to be used for the IAM Policy that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_policy_iam_user_self_mgmt = "iam-user-self-mgmt"

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = true

  # Should we create the IAM Group for access to all external AWS accounts? 
  should_create_iam_group_cross_account_access_all = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = true

  # Should we create the IAM Group for full access? Allows full access to all
  # AWS resources. (true or false)
  should_create_iam_group_full_access = true

  # Should we create the IAM Group for IAM administrator access? Allows users to
  # manage all IAM entities, effectively granting administrator access. (true or
  # false)
  should_create_iam_group_iam_admin = false

  # Should we create the IAM Group for logs? Allows read access to CloudTrail,
  # AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also
  # give decrypt access to a KMS CMK. (true or false)
  should_create_iam_group_logs = true

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = true

  # Should we create the IAM Group for support users? Allows users to access AWS
  # support.
  should_create_iam_group_support = false

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for user self-management? Allows users to
  # manage their own IAM user accounts, but not other IAM users. (true or false)
  should_create_iam_group_user_self_mgmt = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-GROUPS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-groups?ref=v1.0.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group
  # will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "access-all-external-accounts"

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"]. Do NOT add iam to the list of
  # services, or that will grant Developers de facto admin access. If you need
  # to grant iam privileges, just grant the user Full Access.
  iam_group_developers_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  iam_group_developers_s3_bucket_prefix = "your-org-name.user-"

  # The name of the IAM Group that allows automated deployment by graning the
  # permissions specified in var.auto_deploy_permissions.
  iam_group_name_auto_deploy = "_machine.ecs-auto-deploy"

  # The name to be used for the IAM Group that grants read/write access to all
  # billing features in AWS.
  iam_group_name_billing = "billing"

  # The name to be used for the IAM Group that grants IAM Users a reasonable set
  # of permissions for developers.
  iam_group_name_developers = "developers"

  # The name to be used for the IAM Group that grants full access to all AWS
  # resources.
  iam_group_name_full_access = "full-access"

  # The name to be used for the IAM Group that grants IAM administrative access.
  # Effectively grants administrator access.
  iam_group_name_iam_admin = "iam-admin"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_group_name_iam_user_self_mgmt = "iam-user-self-mgmt"

  # The name to be used for the IAM Group that grants read access to CloudTrail,
  # AWS Config, and CloudWatch in AWS.
  iam_group_name_logs = "logs"

  # The name to be used for the IAM Group that grants read-only access to all
  # AWS resources.
  iam_group_name_read_only = "read-only"

  # The name of the IAM Group that allows access to AWS Support.
  iam_group_name_support = "support"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to use existing IAM Roles when launching AWS Resources. This does NOT grant
  # the permission to create new IAM Roles.
  iam_group_name_use_existing_iam_roles = "use-existing-iam-roles"

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = ["ssh-grunt-sudo-users"]

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = ["ssh-grunt-users"]

  # This variable is used to create groups that allow IAM users to assume roles
  # in your other AWS accounts. It should be a list of objects, where each
  # object has the fields 'group_name', which will be used as the name of the
  # IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that
  # you can assume when part of that group. For each entry in the list of
  # objects, we will create an IAM group that allows users to assume the given
  # IAM role(s) in the other AWS account. This allows you to define all your IAM
  # users in one account (e.g. the users account) and to grant them access to
  # certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # The name to be used for the IAM Policy that grants IAM administrative
  # access.
  iam_policy_iam_admin = "iam-admin"

  # The name to be used for the IAM Policy that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_policy_iam_user_self_mgmt = "iam-user-self-mgmt"

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = true

  # Should we create the IAM Group for access to all external AWS accounts? 
  should_create_iam_group_cross_account_access_all = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = true

  # Should we create the IAM Group for full access? Allows full access to all
  # AWS resources. (true or false)
  should_create_iam_group_full_access = true

  # Should we create the IAM Group for IAM administrator access? Allows users to
  # manage all IAM entities, effectively granting administrator access. (true or
  # false)
  should_create_iam_group_iam_admin = false

  # Should we create the IAM Group for logs? Allows read access to CloudTrail,
  # AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also
  # give decrypt access to a KMS CMK. (true or false)
  should_create_iam_group_logs = true

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = true

  # Should we create the IAM Group for support users? Allows users to access AWS
  # support.
  should_create_iam_group_support = false

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for user self-management? Allows users to
  # manage their own IAM user accounts, but not other IAM users. (true or false)
  should_create_iam_group_user_self_mgmt = true

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

<HclListItem name="should_require_mfa" requirement="required" type="bool">
<HclListItemDescription>

Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

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

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cross_account_access_all_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM group that will grant access to all external AWS accounts in <a href="#iam_groups_for_cross_account_access"><code>iam_groups_for_cross_account_access</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;access-all-external-accounts&quot;"/>
</HclListItem>

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_group_developers_s3_bucket_prefix" requirement="optional" type="string">
<HclListItemDescription>

The prefix of the S3 Bucket Name to which an individual IAM User will have full access. For example, if the prefix is acme.user-, then IAM User john.doe will have access to S3 Bucket acme.user-john.doe.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;your-org-name.user-&quot;"/>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       group_name   = "stage-full-access"
       iam_role_arns = ["arn:aws:iam::123445678910:role/mgmt-full-access"]
     },
     {
       group_name   = "prod-read-only-access"
       iam_role_arns = [
         "arn:aws:iam::9876543210:role/prod-read-only-ec2-access",
         "arn:aws:iam::9876543210:role/prod-read-only-rds-access"
       ]
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_policy_iam_admin" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Policy that grants IAM administrative access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-admin&quot;"/>
</HclListItem>

<HclListItem name="iam_policy_iam_user_self_mgmt" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-user-self-mgmt&quot;"/>
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
<HclListItemDefaultValue defaultValue="true"/>
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
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_full_access" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_support" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for support users? Allows users to access AWS support.

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

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-groups/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-groups/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/iam-groups/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2e51948ff49bfc7567aa46c6aa1dd9d8"
}
##DOCS-SOURCER-END -->
