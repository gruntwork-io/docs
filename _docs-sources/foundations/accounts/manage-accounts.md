import Admonition from "@theme/Admonition"

# Manage your accounts

Gruntwork's Control Tower integration provides an IaC-based (infrastructure as code) approach to many of your account management needs. Operations within those accounts can be grouped according to whether they may be performed in IaC, the AWS Console, or either. _When operations may be performed in either location, we strongly recommend using IaC._

## Prerequisites

- An AWS account with AWS Control Tower set up
- Access to an IAM User or Role with administrative permissions to AWS Control Tower

## How to manage your accounts

Below you'll find a table with common account operations and the Gruntwork recommendation for if the operation should be done using IaC or in the AWS Console. When both options are available, using IaC is strongly recommended. You can explore more documentation for each operation by clicking on the operation name in the table.

| Management Operation                                                                                                                        | Terraform (IaC)  | AWS Console (ClickOps) |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------- |
| [Create a new Organization Unit](https://docs.aws.amazon.com/controltower/latest/userguide/create-new-ou.html) (OU)                         | ❌               | ✅                     |
| [Request a new account](./add-account.md)                                                                                                   | ✅               | ❌                     |
| [Create a new account](./add-account.md)                                                                                                    | ✅               | ❌                     |
| [Removing an account](./manage-accounts.md#removing-an-account)                                                                             | ✅               | ❌                     |
| [Renaming an account](https://docs.aws.amazon.com/controltower/latest/userguide/change-account-name.html)                                   | ❌               | ✅                     |
| [Update root account e-mail address](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-root-user.html)               | ❌               | ✅                     |
| [Modify account controls](https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html)                             | ❌               | ✅                     |
| [Moving an account to a new Organizational Unit](./manage-accounts.md#un-managing-an-account)                                               | ✅ (recommended) | ✅ (discouraged)       |
| [Update account admin user in Account Access IAM Identity Center](./manage-accounts.md#un-managing-an-account)                              | ✅ (recommended) | ✅ (discouraged)       |
| Granting additional users access to accounts in AWS IAM Identity Center                                                                     | ✅ (recommended) | ✅ (discouraged)       |


## Removing an account

1. Create a branch and delete the directory in your `infrastructure-live` repository that corresponds to the account you would like to remove.

<Admonition type="warning" title="Warning">
    <p>This will delete all resources in the account. Make sure you are deleting the correct directory.</p>
</Admonition>

Push your changes and create a PR. Pipelines will detect that an account is deleted. Verify that all expected resources will be removed in the `plan` output.

Once you have confirmed everything looks as expected, merge the PR.

1. Create a branch and delete the account request file in `_new_account_requests`

This will de-provision the product in AWS Service Catalog, but will not delete the account.

Push your changes and create a PR. Pipelines will detect that the account should be removed, which can be verified in the `plan` output.

Once you have confirmed everything looks as expected, merge the PR. After `apply` runs, the account status should be `Suspended`.

## Updating the account request

You may update some attributes attributes of an AWS Account by modifying the the account request file in `_new_account_requests`. See below for steps to update each attribute.

Start by creating a new branch that will contain your changes.

1. Update the name of the OU by modifying the `organizational_unit_name` key
1. Updating the account admin user by modifying the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys to the new users first name, last name, and email.

After you have made your modifications, push your branch and create a pull request. Gruntwork Pipelines will detect the account changes and run a `plan` operation. Review the output of the `plan` to confirm the output is as expected. Once confirmed, merge the PR to apply the changes.
