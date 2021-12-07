import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# IAM Users and IAM Groups

Convenient module to manage best practices set of IAM Groups for permissions management, and configuring IAM Users that take advantage of those groups.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/iam-users-and-groups" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="auto_deploy_permissions" href="#auto_deploy_permissions" className="snap-top">
          <code>auto_deploy_permissions</code>
        </a> - A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If var.should_create_iam_group_auto_deploy is true, the list must have at least one element (e.g. '*').
      </p>
    </li>
    <li>
      <p>
        <a name="aws_account_id" href="#aws_account_id" className="snap-top">
          <code>aws_account_id</code>
        </a> - The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_arn" href="#cloudtrail_kms_key_arn" className="snap-top">
          <code>cloudtrail_kms_key_arn</code>
        </a> - The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group will include permissions to decrypt using this CMK.
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top">
          <code>cross_account_access_all_group_name</code>
        </a> - The name of the IAM group that will grant access to all external AWS accounts in var.iam_groups_for_cross_account_access.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_iam_groups" href="#enable_iam_groups" className="snap-top">
          <code>enable_iam_groups</code>
        </a> - A feature flag to enable or disable the IAM Groups module.
      </p>
    </li>
    <li>
      <p>
        <a name="force_destroy_users" href="#force_destroy_users" className="snap-top">
          <code>force_destroy_users</code>
        </a> - When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_developers_permitted_services" href="#iam_group_developers_permitted_services" className="snap-top">
          <code>iam_group_developers_permitted_services</code>
        </a> - A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_auto_deploy" href="#iam_group_name_auto_deploy" className="snap-top">
          <code>iam_group_name_auto_deploy</code>
        </a> - The name of the IAM Group that allows automated deployment by graning the permissions specified in var.auto_deploy_permissions.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_billing" href="#iam_group_name_billing" className="snap-top">
          <code>iam_group_name_billing</code>
        </a> - The name to be used for the IAM Group that grants read/write access to all billing features in AWS.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_developers" href="#iam_group_name_developers" className="snap-top">
          <code>iam_group_name_developers</code>
        </a> - The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_full_access" href="#iam_group_name_full_access" className="snap-top">
          <code>iam_group_name_full_access</code>
        </a> - The name to be used for the IAM Group that grants full access to all AWS resources.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_houston_cli" href="#iam_group_name_houston_cli" className="snap-top">
          <code>iam_group_name_houston_cli</code>
        </a> - The name of the IAM Group that allows access to houston CLI.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_iam_admin" href="#iam_group_name_iam_admin" className="snap-top">
          <code>iam_group_name_iam_admin</code>
        </a> - The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_iam_user_self_mgmt" href="#iam_group_name_iam_user_self_mgmt" className="snap-top">
          <code>iam_group_name_iam_user_self_mgmt</code>
        </a> - The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_logs" href="#iam_group_name_logs" className="snap-top">
          <code>iam_group_name_logs</code>
        </a> - The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_read_only" href="#iam_group_name_read_only" className="snap-top">
          <code>iam_group_name_read_only</code>
        </a> - The name to be used for the IAM Group that grants read-only access to all AWS resources.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_support" href="#iam_group_name_support" className="snap-top">
          <code>iam_group_name_support</code>
        </a> - The name of the IAM Group that allows access to AWS Support.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_use_existing_iam_roles" href="#iam_group_name_use_existing_iam_roles" className="snap-top">
          <code>iam_group_name_use_existing_iam_roles</code>
        </a> - The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_names_ssh_grunt_sudo_users" href="#iam_group_names_ssh_grunt_sudo_users" className="snap-top">
          <code>iam_group_names_ssh_grunt_sudo_users</code>
        </a> - The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_names_ssh_grunt_users" href="#iam_group_names_ssh_grunt_users" className="snap-top">
          <code>iam_group_names_ssh_grunt_users</code>
        </a> - The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_groups_for_cross_account_access" href="#iam_groups_for_cross_account_access" className="snap-top">
          <code>iam_groups_for_cross_account_access</code>
        </a> - This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
      </p>
    </li>
    <li>
      <p>
        <a name="iam_policy_iam_user_self_mgmt" href="#iam_policy_iam_user_self_mgmt" className="snap-top">
          <code>iam_policy_iam_user_self_mgmt</code>
        </a> - The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_role_tags" href="#iam_role_tags" className="snap-top">
          <code>iam_role_tags</code>
        </a> - The tags to apply to all the IAM role resources.
      </p>
    </li>
    <li>
      <p>
        <a name="max_session_duration_human_users" href="#max_session_duration_human_users" className="snap-top">
          <code>max_session_duration_human_users</code>
        </a> - The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see var.max_session_duration_machine_users.
      </p>
    </li>
    <li>
      <p>
        <a name="max_session_duration_machine_users" href="#max_session_duration_machine_users" className="snap-top">
          <code>max_session_duration_machine_users</code>
        </a> - The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see var.max_session_duration_human_users.
      </p>
    </li>
    <li>
      <p>
        <a name="minimum_password_length" href="#minimum_password_length" className="snap-top">
          <code>minimum_password_length</code>
        </a> - Password minimum length.
      </p>
    </li>
    <li>
      <p>
        <a name="password_reset_required" href="#password_reset_required" className="snap-top">
          <code>password_reset_required</code>
        </a> - Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_auto_deploy" href="#should_create_iam_group_auto_deploy" className="snap-top">
          <code>should_create_iam_group_auto_deploy</code>
        </a> - Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in var.auto_deploy_permissions. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_billing" href="#should_create_iam_group_billing" className="snap-top">
          <code>should_create_iam_group_billing</code>
        </a> - Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_cross_account_access_all" href="#should_create_iam_group_cross_account_access_all" className="snap-top">
          <code>should_create_iam_group_cross_account_access_all</code>
        </a> - Should we create the IAM Group for access to all external AWS accounts? 
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_developers" href="#should_create_iam_group_developers" className="snap-top">
          <code>should_create_iam_group_developers</code>
        </a> - Should we create the IAM Group for developers? The permissions of that group are specified via var.iam_group_developers_permitted_services. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_full_access" href="#should_create_iam_group_full_access" className="snap-top">
          <code>should_create_iam_group_full_access</code>
        </a> - Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_houston_cli_users" href="#should_create_iam_group_houston_cli_users" className="snap-top">
          <code>should_create_iam_group_houston_cli_users</code>
        </a> - Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_iam_admin" href="#should_create_iam_group_iam_admin" className="snap-top">
          <code>should_create_iam_group_iam_admin</code>
        </a> - Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_logs" href="#should_create_iam_group_logs" className="snap-top">
          <code>should_create_iam_group_logs</code>
        </a> - Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also give decrypt access to a KMS CMK. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_read_only" href="#should_create_iam_group_read_only" className="snap-top">
          <code>should_create_iam_group_read_only</code>
        </a> - Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_support" href="#should_create_iam_group_support" className="snap-top">
          <code>should_create_iam_group_support</code>
        </a> - Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_use_existing_iam_roles" href="#should_create_iam_group_use_existing_iam_roles" className="snap-top">
          <code>should_create_iam_group_use_existing_iam_roles</code>
        </a> - Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_user_self_mgmt" href="#should_create_iam_group_user_self_mgmt" className="snap-top">
          <code>should_create_iam_group_user_self_mgmt</code>
        </a> - Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_require_mfa" href="#should_require_mfa" className="snap-top">
          <code>should_require_mfa</code>
        </a> - Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="users" href="#users" className="snap-top">
          <code>users</code>
        </a> - A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="billing_iam_group_arn" href="#billing_iam_group_arn" className="snap-top">
          <code>billing_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="billing_iam_group_name" href="#billing_iam_group_name" className="snap-top">
          <code>billing_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_arn" href="#cross_account_access_all_group_arn" className="snap-top">
          <code>cross_account_access_all_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top">
          <code>cross_account_access_all_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_group_arns" href="#cross_account_access_group_arns" className="snap-top">
          <code>cross_account_access_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_group_names" href="#cross_account_access_group_names" className="snap-top">
          <code>cross_account_access_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="developers_iam_group_arn" href="#developers_iam_group_arn" className="snap-top">
          <code>developers_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="developers_iam_group_name" href="#developers_iam_group_name" className="snap-top">
          <code>developers_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="full_access_iam_group_arn" href="#full_access_iam_group_arn" className="snap-top">
          <code>full_access_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="full_access_iam_group_name" href="#full_access_iam_group_name" className="snap-top">
          <code>full_access_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="houston_cli_users_iam_group_arn" href="#houston_cli_users_iam_group_arn" className="snap-top">
          <code>houston_cli_users_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="houston_cli_users_iam_group_name" href="#houston_cli_users_iam_group_name" className="snap-top">
          <code>houston_cli_users_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_group_arn" href="#iam_admin_iam_group_arn" className="snap-top">
          <code>iam_admin_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_group_name" href="#iam_admin_iam_group_name" className="snap-top">
          <code>iam_admin_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_policy_arn" href="#iam_admin_iam_policy_arn" className="snap-top">
          <code>iam_admin_iam_policy_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_group_arn" href="#iam_self_mgmt_iam_group_arn" className="snap-top">
          <code>iam_self_mgmt_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_group_name" href="#iam_self_mgmt_iam_group_name" className="snap-top">
          <code>iam_self_mgmt_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_policy_arn" href="#iam_self_mgmt_iam_policy_arn" className="snap-top">
          <code>iam_self_mgmt_iam_policy_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="logs_iam_group_arn" href="#logs_iam_group_arn" className="snap-top">
          <code>logs_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="logs_iam_group_name" href="#logs_iam_group_name" className="snap-top">
          <code>logs_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="read_only_iam_group_arn" href="#read_only_iam_group_arn" className="snap-top">
          <code>read_only_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="read_only_iam_group_name" href="#read_only_iam_group_name" className="snap-top">
          <code>read_only_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="require_mfa_policy" href="#require_mfa_policy" className="snap-top">
          <code>require_mfa_policy</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_sudo_users_group_arns" href="#ssh_grunt_sudo_users_group_arns" className="snap-top">
          <code>ssh_grunt_sudo_users_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_sudo_users_group_names" href="#ssh_grunt_sudo_users_group_names" className="snap-top">
          <code>ssh_grunt_sudo_users_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_users_group_arns" href="#ssh_grunt_users_group_arns" className="snap-top">
          <code>ssh_grunt_users_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_users_group_names" href="#ssh_grunt_users_group_names" className="snap-top">
          <code>ssh_grunt_users_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="support_iam_group_arn" href="#support_iam_group_arn" className="snap-top">
          <code>support_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="support_iam_group_name" href="#support_iam_group_name" className="snap-top">
          <code>support_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="use_existing_iam_roles_iam_group_arn" href="#use_existing_iam_roles_iam_group_arn" className="snap-top">
          <code>use_existing_iam_roles_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="use_existing_iam_roles_iam_group_name" href="#use_existing_iam_roles_iam_group_name" className="snap-top">
          <code>use_existing_iam_roles_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="user_access_keys" href="#user_access_keys" className="snap-top">
          <code>user_access_keys</code>
        </a> - A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt
      </p>
    </li>
    <li>
      <p>
        <a name="user_arns" href="#user_arns" className="snap-top">
          <code>user_arns</code>
        </a> - A map of usernames to the ARN for that IAM user.
      </p>
    </li>
    <li>
      <p>
        <a name="user_passwords" href="#user_passwords" className="snap-top">
          <code>user_passwords</code>
        </a> - A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"48f086d0190ec049595289dadef844d2"}
##DOCS-SOURCER-END -->
