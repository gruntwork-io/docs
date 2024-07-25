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

We recommend using the AWS Console's Organizations interface for closing an account and destroying all of its resources, due to current flakiness of the AWS Service Catalog when performing deletes via OpenTofu/Terraform providers. See the steps below for the complete sequence of actions to remove an account.

:::note
AWS Organizations will permanently [close an account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-closing.html) after 90 days.
:::



#### 1. (Optional) Destroy resources in the account to be removed

You may choose or need to destroy some or all of your provisioned resources, if the resources are managed by Terragrunt in your infrastructure repository which has Gruntwork Pipelines integrated, you can destroy them by doing the following:

1. Checkout a new branch in the infrastructure repository
1. Remove the folder(s) containing the resources you want to destroy
1. Commit your changes and create a Pull Request which will trigger Gruntwork Pipelines to destroy the resource once the Pull Request is merged.

    :::danger
    Make sure you are deleting the correct resources in the right account and that you have a backup of any data you may need in the future.

    Do not delete the OIDC provider and Pipelines IAM roles except you longer need Gruntwork Pipelines to deploy changes to any other resource in the account.
    :::

    :::note
    You may also need to delete resources if you encounter issues with coordination between different accounts where resources remain present in the account to be closed that are referenced in other accounts.
    :::


#### 2. Cleanup Central/Root Infrastructure Repository

:::caution
All code changes should be committed, **at the end**, to Git with a **[skip ci]** in the commit message to avoid triggering Gruntwork Pipelines and flakiness of account removal from Control Tower using AWS Service Catalog.
:::

1. Obtain AWS CLI credentials for the your *management* account.
1. Checkout a new branch in your central/root infrastructure repository
1. Navigate to the `_new-account-requests` folder in the repository
1. Delete the account request file corresponding to each account slated for removal

    :::danger
    Make sure you are deleting the correct account request file and do not attempt to delete more than 5 accounts at once because [Control Tower has concurrent operations limit of 5](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/main/modules/landingzone/control-tower-account-factory#resourceinuseexception).
    :::

1. Locate and modify the `accounts.yml` file in the central/root infrastructure repository, removing any data associated with the accounts to be removed.
1. (Optional) Remove AWS Transit Gateway(TGW) attachments. If an account being removed uses AWS TGW, you will need to remove the attachments by running the following commands sequentially:

    ```bash
    cd <NETWORK-ACCOUNT>/_global/transit_gateway_attachments/
    terragrunt plan
    terragrunt apply
    ```

    This is a plan/apply operation because the TGW module reads the `accounts.yml` file to determine which accounts are attached to the TGW.

1. Remove the targeted account(s) from being controlled by the *management* account's Control Tower module

  ```bash
  cd management/_global/control-tower-multi-account-factory/
  terragrunt plan # Observe that targeted accounts are set for destruction
  terragrunt state rm 'module.accounts["<ACCOUNT_NAME>"].aws_servicecatalog_provisioned_product.control_tower_factory' # Optionally, use 'rm -dry-run' to preview the removal.
  terragrunt plan # Verify no accounts are set for destruction but outputs are updated
  terragrunt apply # Apply the changes.
  ```

1. Delete the folders for the targeted accounts from the repository.
1. Commit all changes to your branch, ensuring to include `[skip ci]` in the commit message.
1. Open a Pull Request and observe that `Pipelines Plan` is absent.
1. Approve and **squash-merge**(if you have multiple commits) the Pull Request, again ensuring to include `[skip ci]` in the commit message to prevent Gruntwork Pipelines from initiating any destruction processes.


#### 3. Close the account(s) in AWS Organizations

1. Authenticate to your Management Account's AWS console.
2. Visit the AWS Organizations page.
3. For each account targeted for deletion, select the "close" option. In 90 days, AWS will permanently delete the account.


#### 4. (Optional) Cleanup Team Infrastructure Repository

If targeted accounts were created as part of a separate infra-live-team repository and;

1. If all the accounts in a team-repo have been closed; delete the entire repository else delete the accounts folders for only the closed accounts and repeat the CI steps of creating a PR and merging it with `[skip ci]` in the commit message.
2. If team repositories were removed above **and** you have a setup that includes an `infrastructure-pipelines` repository; complete the cleanup process by removing the deleted repository references from the Gruntwork Pipelines configuration in `.gruntwork/config` file located in the `infrastructure-pipelines` repository via a Pull Request and merge it into the designated *main* branch.

#### 5. (Optional) Cleanup Access Control Infrastructure Repository

If your setup includes an `infrastructure-access-control` repository;

1. Remove the deleted account references from the `accounts.yml` file in the access control repository.
2. Remove the folders for the deleted accounts from the repository.
3. Repeat the CI steps of creating a PR and merging it with `[skip ci]` in the commit message.


### Update the new AWS account request

You may update some attributes of an AWS Account by modifying the account request file in `_new_account_requests`. See below for steps to update each attribute.

Start by creating a new branch that will contain your changes.

1. Update the name of the OU by modifying the `organizational_unit_name` key
1. Updating the account admin user by modifying the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys to the new users first name, last name, and email.

After you have made your modifications, push your branch and create a pull request. Gruntwork Pipelines will detect the account changes and run a `plan` operation. Review the output of the `plan` to confirm the output is as expected. Once confirmed, merge the PR to apply the changes.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "0330efad103224849952bb28e534eee0"
}
##DOCS-SOURCER-END -->
