import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# IAM Users and IAM Groups

Convenient module to manage best practices set of IAM Groups for permissions management, and configuring IAM Users that take advantage of those groups.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/iam-users-and-groups" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>auto_deploy_permissions</td>
        <td>A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If var.should_create_iam_group_auto_deploy is true, the list must have at least one element (e.g. '*').</td>
    </tr><tr>
        <td>aws_account_id</td>
        <td>The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_arn</td>
        <td>The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs group will include permissions to decrypt using this CMK.</td>
    </tr><tr>
        <td>cross_account_access_all_group_name</td>
        <td>The name of the IAM group that will grant access to all external AWS accounts in var.iam_groups_for_cross_account_access.</td>
    </tr><tr>
        <td>enable_iam_groups</td>
        <td>A feature flag to enable or disable the IAM Groups module.</td>
    </tr><tr>
        <td>force_destroy_users</td>
        <td>When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.</td>
    </tr><tr>
        <td>iam_group_developers_permitted_services</td>
        <td>A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.</td>
    </tr><tr>
        <td>iam_group_name_auto_deploy</td>
        <td>The name of the IAM Group that allows automated deployment by graning the permissions specified in var.auto_deploy_permissions.</td>
    </tr><tr>
        <td>iam_group_name_billing</td>
        <td>The name to be used for the IAM Group that grants read/write access to all billing features in AWS.</td>
    </tr><tr>
        <td>iam_group_name_developers</td>
        <td>The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.</td>
    </tr><tr>
        <td>iam_group_name_full_access</td>
        <td>The name to be used for the IAM Group that grants full access to all AWS resources.</td>
    </tr><tr>
        <td>iam_group_name_houston_cli</td>
        <td>The name of the IAM Group that allows access to houston CLI.</td>
    </tr><tr>
        <td>iam_group_name_iam_admin</td>
        <td>The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.</td>
    </tr><tr>
        <td>iam_group_name_iam_user_self_mgmt</td>
        <td>The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.</td>
    </tr><tr>
        <td>iam_group_name_logs</td>
        <td>The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.</td>
    </tr><tr>
        <td>iam_group_name_read_only</td>
        <td>The name to be used for the IAM Group that grants read-only access to all AWS resources.</td>
    </tr><tr>
        <td>iam_group_name_support</td>
        <td>The name of the IAM Group that allows access to AWS Support.</td>
    </tr><tr>
        <td>iam_group_name_use_existing_iam_roles</td>
        <td>The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.</td>
    </tr><tr>
        <td>iam_group_names_ssh_grunt_sudo_users</td>
        <td>The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.</td>
    </tr><tr>
        <td>iam_group_names_ssh_grunt_users</td>
        <td>The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.</td>
    </tr><tr>
        <td>iam_groups_for_cross_account_access</td>
        <td>This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).</td>
    </tr><tr>
        <td>iam_policy_iam_user_self_mgmt</td>
        <td>The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.</td>
    </tr><tr>
        <td>iam_role_tags</td>
        <td>The tags to apply to all the IAM role resources.</td>
    </tr><tr>
        <td>max_session_duration_human_users</td>
        <td>The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see var.max_session_duration_machine_users.</td>
    </tr><tr>
        <td>max_session_duration_machine_users</td>
        <td>The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see var.max_session_duration_human_users.</td>
    </tr><tr>
        <td>minimum_password_length</td>
        <td>Password minimum length.</td>
    </tr><tr>
        <td>password_reset_required</td>
        <td>Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.</td>
    </tr><tr>
        <td>should_create_iam_group_auto_deploy</td>
        <td>Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in var.auto_deploy_permissions. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_billing</td>
        <td>Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_cross_account_access_all</td>
        <td>Should we create the IAM Group for access to all external AWS accounts? </td>
    </tr><tr>
        <td>should_create_iam_group_developers</td>
        <td>Should we create the IAM Group for developers? The permissions of that group are specified via var.iam_group_developers_permitted_services. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_full_access</td>
        <td>Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_houston_cli_users</td>
        <td>Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.</td>
    </tr><tr>
        <td>should_create_iam_group_iam_admin</td>
        <td>Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_logs</td>
        <td>Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also give decrypt access to a KMS CMK. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_read_only</td>
        <td>Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_support</td>
        <td>Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_use_existing_iam_roles</td>
        <td>Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_user_self_mgmt</td>
        <td>Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)</td>
    </tr><tr>
        <td>should_require_mfa</td>
        <td>Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)</td>
    </tr><tr>
        <td>users</td>
        <td>A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>billing_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>billing_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_all_group_arn</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_all_group_name</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_group_arns</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_group_names</td>
        <td></td>
    </tr><tr>
        <td>developers_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>developers_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>full_access_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>full_access_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>houston_cli_users_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>houston_cli_users_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_policy_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_policy_arn</td>
        <td></td>
    </tr><tr>
        <td>logs_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>logs_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>read_only_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>read_only_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>require_mfa_policy</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_sudo_users_group_arns</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_sudo_users_group_names</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_users_group_arns</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_users_group_names</td>
        <td></td>
    </tr><tr>
        <td>support_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>support_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>use_existing_iam_roles_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>use_existing_iam_roles_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>user_access_keys</td>
        <td>A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt</td>
    </tr><tr>
        <td>user_arns</td>
        <td>A map of usernames to the ARN for that IAM user.</td>
    </tr><tr>
        <td>user_passwords</td>
        <td>A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"628868540afd3f3cc62aef46e7c6d75b"}
##DOCS-SOURCER-END -->
