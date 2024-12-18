

# Modifying an AWS Account

Managing AWS accounts often involves operations such as requesting new accounts, creating accounts, or renaming them. The Gruntwork Account Factory defines account management tasks that must be handled exclusively through Infrastructure as Code (IaC), others that are limited to ClickOps in the AWS Console, and some that support both methods.

This page provides guidance on which mode (IaC or ClickOps) is appropriate for various AWS account operations. When both options are available, we strongly recommended IaC for consistency, auditability, and reduced manual error.

## Prerequisites

This page applies to users who are:
- Actively running Gruntwork Account Factory
- Have access to an AWS user or IAM Role with administrative permissions to AWS Control Tower

## When to use IaC vs. ClickOps

The table below highlights common AWS account operations and provides recommendations on whether to perform them using IaC or the AWS Console. Again, when both approaches are supported, we strongly recommend IaC. For detailed information on each operation, click the operation name in the table.

- ✅ means that the operation should or can only be done using the given mode.
- ❌ means that the operation should not or cannot be done using the given mode.

| Management Operation                                                                                                          | Terraform (IaC)  | AWS Console (ClickOps) |
|-------------------------------------------------------------------------------------------------------------------------------| ---------------- | ---------------------- |
| [Create a new Organization Unit](https://docs.aws.amazon.com/controltower/latest/userguide/create-new-ou.html) (OU)           | ❌               | ✅                     |
| [Request a new account](/2.0/docs/accountfactory/guides/vend-aws-account)                                                                                                         | ✅               | ❌                     |
| [Create a new account](/2.0/docs/accountfactory/guides/vend-aws-account)                                                                                                          | ✅               | ❌                     |
| [Remove an account](/2.0/docs/accountfactory/tutorials/remove-account.md)                                                                                       | ✅               | ❌                     |
| [Rename an account](https://docs.aws.amazon.com/controltower/latest/userguide/change-account-name.html)                       | ❌               | ✅                     |
| [Update root account e-mail address](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-root-user.html) | ❌               | ✅                     |
| [Modify account controls](https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html)               | ❌               | ✅                     |
| Moving an account to a new Organizational Unit                                                                                | ✅ (recommended) | ✅ (discouraged)       |
| Update account admin user in Account Access IAM Identity Center                                                               | ✅ (recommended) | ✅ (discouraged)       |
| Granting additional users access to accounts in AWS IAM Identity Center                                                       | ✅ (recommended) | ✅ (discouraged)       |


### Updating the Account via the new AWS account request file

You can update specific attributes of an AWS account by modifying the corresponding account request file in the `_new_account_requests` directory. Follow the steps below to update specific attributes:

#### Steps to Update

1. Begin by creating a new branch to contain your changes.
2. Update the desired attributes:
   - To change the Organizational Unit (OU) name, modify the value of the `organizational_unit_name` key.
   - To update the account admin user, adjust the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys with the new user's first name, last name, and email.
     
#### Applying the Updates

After completing your modifications:
1. Push the branch containing your changes and create a pull request.
2. Gruntwork Pipelines automatically detects updates and executes a `plan` operation.
3. Review the output of the `plan` to ensure the changes are accurate and meet expectations.
4. Once the changes are validated, merge the pull request to apply the updates.

