# Managing your AWS accounts

Over time you will need to run various operations on your AWS accounts such as requesting new accounts, creating new accounts, renaming accounts, etc. In Gruntwork Landing Zone, some AWS account management operations should only be done using IaC, some can only be done using ClickOps, and some can be done using either.

In this page, we review which mode (IaC or ClickOps) to use for each AWS account operation. _When operations may be performed using either mode, we strongly recommend using IaC._

## Prerequisites

This page applies to users who are:
- Actively running Gruntwork Landing Zone
- Have access to an AWS user or IAM Role with administrative permissions to AWS Control Tower

## When to use IaC vs. ClickOps

Below you'll find a table with common AWS account operations and the Gruntwork recommendation for if the operation should be done using IaC or in the AWS Console. When both options are available, using IaC is strongly recommended. You can explore more documentation for each operation by clicking on the operation name in the table.

- ✅ means that the operation should or can only be done using the given mode.
- ❌ means that the operation should not or cannot be done using the given mode.

| Management Operation                                                                                                          | Terraform (IaC)  | AWS Console (ClickOps) |
|-------------------------------------------------------------------------------------------------------------------------------| ---------------- | ---------------------- |
| [Create a new Organization Unit](https://docs.aws.amazon.com/controltower/latest/userguide/create-new-ou.html) (OU)           | ❌               | ✅                     |
| Request a new account                                                                                                         | ✅               | ❌                     |
| Create a new account                                                                                                          | ✅               | ❌                     |
| [Remove an account](#remove-an-aws-account)                                                                                       | ✅               | ❌                     |
| [Rename an account](https://docs.aws.amazon.com/controltower/latest/userguide/change-account-name.html)                       | ❌               | ✅                     |
| [Update root account e-mail address](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-root-user.html) | ❌               | ✅                     |
| [Modify account controls](https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html)               | ❌               | ✅                     |
| Moving an account to a new Organizational Unit                                                                                | ✅ (recommended) | ✅ (discouraged)       |
| Update account admin user in Account Access IAM Identity Center                                                               | ✅ (recommended) | ✅ (discouraged)       |
| Granting additional users access to accounts in AWS IAM Identity Center                                                       | ✅ (recommended) | ✅ (discouraged)       |


## AWS account management operations

### Remove an AWS account

This operation removes an AWS account from AWS Control Tower but does _not_ delete the AWS account.

1. Create a branch and delete the directory in your `infrastructure-live` repository that corresponds to the account you would like to remove.

    :::warning
    This will delete all resources in the account. Make sure you are deleting the correct directory.
    :::

    Push your changes and create a PR. Pipelines will detect that an account is deleted. Verify that all expected resources will be removed in the `plan` output.

    Once you have confirmed everything looks as expected, merge the PR.

1. Create a branch and delete the account request file in `_new_account_requests`.

    This will de-provision the product in AWS Service Catalog, but will not delete the account.

    Push your changes and create a PR. Pipelines will detect that the account should be removed, which can be verified in the `plan` output.

    Once you have confirmed everything looks as expected, merge the PR. After `apply` runs, the account status should be `Suspended`.

1. Close the account in AWS Organizations.
    1. Authenticate to your Management Account's AWS console.
    1. Visit the AWS Organizations service dashboard.
    1. For each account targeted for deletion, select the "close" option. This will initiate the process of closing the account, which will take 90 days to complete.

    :::tip
    If you run into any trouble while closing your account(s), visit [this helpful GitHub discussion](https://github.com/orgs/gruntwork-io/discussions/797) for troubleshooting tips.
    :::

### Update the new AWS account request

You may update some attributes of an AWS Account by modifying the account request file in `_new_account_requests`. See below for steps to update each attribute.

Start by creating a new branch that will contain your changes.

1. Update the name of the OU by modifying the `organizational_unit_name` key
1. Updating the account admin user by modifying the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys to the new users first name, last name, and email.

After you have made your modifications, push your branch and create a pull request. Gruntwork Pipelines will detect the account changes and run a `plan` operation. Review the output of the `plan` to confirm the output is as expected. Once confirmed, merge the PR to apply the changes.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0f4db4697ea33331fef7fd5b8da4a0b1"
}
##DOCS-SOURCER-END -->
