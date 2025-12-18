# Modifying an AWS Account

Managing AWS accounts involves tasks such as requesting new accounts, creating accounts, or renaming them. The Gruntwork Account Factory specifies which account management tasks must be performed exclusively through Infrastructure as Code (IaC), which are restricted to ClickOps in the AWS Console, and which support both methods.

This page outlines the appropriate mode (IaC or ClickOps) for various AWS account operations. When both options are available, we strongly recommended IaC for consistency, auditability, and reduced manual error.


## Prerequisites

This page is intended for users who are:
- Are actively running Gruntwork Account Factory
- Have access to an AWS user or IAM role with administrative permissions for AWS Control Tower

## When to use IaC vs. ClickOps

The table below lists common AWS account operations and provides guidance on whether to perform them using IaC or the AWS Console. Again, when both methods are supported, we strongly recommend IaC. For detailed information on each operation, click the operation name in the table.

- ✅ means that the operation is allowed or only possible in the specified mode.
- ❌ means the operation is not allowed or possible in the specified mode.

| Management operation                                                                                                          | Terraform (IaC)  | AWS Console (ClickOps) |
|-------------------------------------------------------------------------------------------------------------------------------| ---------------- | ---------------------- |
| [Create a new Organization Unit](https://docs.aws.amazon.com/controltower/latest/userguide/create-new-ou.html) (OU)           | ❌               | ✅                     |
| [Request a new account](/docs/aws-accelerator/account-factory/guides/vend-aws-account)                                                                                                         | ✅               | ❌                     |
| [Rename an account](https://docs.aws.amazon.com/controltower/latest/userguide/change-account-name.html)                       | ❌               | ✅                     |
| [Update root account e-mail address](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-root-user.html) | ❌               | ✅                     |
| [Modify account controls](https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html)               | ❌               | ✅                     |
| Moving an account to a new Organizational Unit                                                                                | ✅ (recommended) | ✅ (discouraged)       |
| Update account admin user in Account Access IAM Identity Center                                                               | ✅ (recommended) | ✅ (discouraged)       |
| Granting additional users access to accounts in AWS IAM Identity Center                                                       | ✅ (recommended) | ✅ (discouraged)       |

### Updating the account through the new AWS account request file

You can update specific attributes of an AWS account by modifying the corresponding account request file in the `_new_account_requests` directory. Follow the steps below to update specific attributes:

#### Steps to update

1. Create a new branch to contain your changes.
2. Update the desired attributes:
   - To change the Organizational Unit (OU) name, modify the value of the `organizational_unit_name` key.
   - To update the account admin user, adjust the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys with the new user's first name, last name, and email.
     
#### Applying the updates

After completing your modifications:
1. Push the branch with your changes and open a pull request.
2. Gruntwork Pipelines automatically detects updates and executes a `plan` operation.
3. Review the `plan` output to confirm the changes are accurate and align with expectations.
4. Once validated, merge the pull request to apply the updates.
