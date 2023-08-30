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
| [Delete an account](https://docs.aws.amazon.com/controltower/latest/userguide/delete-account.html) (requires un-managing the account first) | ❌               | ✅                     |
| [Modify account controls](https://docs.aws.amazon.com/controltower/latest/userguide/enable-controls-on-ou.html)                             | ❌               | ✅                     |
| [Request a new account](./add-account.md)                                                                                                   | ✅               | ❌                     |
| [Create a new account](./add-account.md)                                                                                                    | ✅               | ❌                     |
| Un-manage an account                                                                                                                        | ✅               | ❌                     |
| [Renaming an account](https://docs.aws.amazon.com/controltower/latest/userguide/change-account-name.html)                                   | ❌               | ✅                     |
| Moving an account to a new Organizational Unit                                                                                              | ✅ (recommended) | ✅ (discouraged)       |
| Update account admin user in Account Access IAM Identity Center                                                                             | ✅ (recommended) | ✅ (discouraged)       |
