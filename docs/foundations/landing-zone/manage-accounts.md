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

We recommend following a two step procedure to close AWS Accounts managed by Devops Foundations:

1. [Cleanup Infrastructure Code](#1-cleanup-infrastructure-code) and modify OpenTofu/Terraform state for the Control Tower module.
1. [Close Account with Clickops](#2-close-the-accounts-in-aws-organizations)

We are recommending that accounts be closed with ClickOps instead of using Gruntwork Pipelines. Removing the account via pipelines by deleting the account request file can and often does work, however the underlying AWS Service Catalog that we use to interact with Control Tower and deprovision the account is not (https://github.com/hashicorp/terraform-provider-aws/issues/31705) and often returns spurious errors that can require multiple retries to complete successfully.  The procedure here is fundamentally about working around that unreliability.

#### 1. Cleanup Infrastructure Code

All the code changes recommended here should be committed for each repository, **at the end**, to Git with a **[skip ci]** in the commit message to avoid triggering Gruntwork Pipelines CI processes.


##### Root/Central Infrastructure Repository

1. Obtain AWS CLI credentials for the your *management* account.
1. Checkout a new branch in your central/root infrastructure repository
1. Navigate to the `_new-account-requests` folder in the repository
1. Delete the account request file corresponding to each account slated for removal

    :::danger
    Make sure you are deleting the correct account request file and do not attempt to delete more than 5 accounts at once because [Control Tower has concurrent operations limit of 5](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/main/modules/landingzone/control-tower-account-factory#resourceinuseexception).
    :::

1. Locate and modify the `accounts.yml` file in the repository, removing any data associated with the accounts to be removed.
1. Remove the targeted account(s) from being controlled by the *management* account's Control Tower module by running the following commands:

  ```bash
  cd management/_global/control-tower-multi-account-factory/ # Navigate to the Control Tower module directory
  terragrunt plan # Observe that targeted accounts are set for destruction
  terragrunt state rm 'module.accounts["<ACCOUNT_NAME>"].aws_servicecatalog_provisioned_product.control_tower_factory' # Optionally, use 'rm -dry-run' to preview the removal.
  terragrunt plan # Verify no accounts are set for destruction but outputs are updated
  terragrunt apply # Apply the changes.
  ```
1. (Optional) Remove AWS Transit Gateway(TGW) attachments. If an account being removed uses AWS TGW, you will need to remove the attachments by running the following commands sequentially:

    ```bash
    cd <NETWORK-ACCOUNT>/_global/transit_gateway_attachments/
    terragrunt plan
    terragrunt apply
    ```

    This is a plan/apply operation because the TGW module reads the `accounts.yml` file to determine which accounts are attached to the TGW.

1. Delete the folders for the targeted accounts from the repository.
1. Commit all changes to your branch, ensuring to include `[skip ci]` in the commit message.
1. Open a Pull Request and observe that `Pipelines Plan` is absent.
1. Approve and **squash-merge**(if you have multiple commits) the Pull Request, again ensuring to include `[skip ci]` in the commit message to prevent Gruntwork Pipelines from initiating any destruction processes.

##### Delegated Infrastructure Repository (Enterprise-only)

If targeted accounts were created as part of a separate delegated infrastructure-live repository and;

1. If all the accounts in a delegated repository have been closed; delete the entire repository else delete the accounts folders for only the closed accounts and repeat the CI steps of creating a PR and merging it with `[skip ci]` in the commit message.
2. If delegated repositories were removed above **and** you have a setup that includes an `infrastructure-pipelines` repository; complete the cleanup process by removing the deleted repository references from the Gruntwork Pipelines configuration in `.gruntwork/config` file located in the `infrastructure-pipelines` repository via a Pull Request and merge it into the designated *main* branch.

##### Access Control Infrastructure Repository (Enterprise-only)

If your setup includes an `infrastructure-access-control` repository;

1. Remove the deleted account references from the `accounts.yml` file in the access control repository.
2. Remove the folders for the deleted accounts from the repository.
3. Repeat the CI steps of creating a PR and merging it with `[skip ci]` in the commit message.

##### (Optional) Destroy resources in Account before closing

You may choose or need to destroy some or all of your provisioned resources before closing an account. e.g You may need to delete resources if you encounter issues with coordination between different accounts where resources remain present in the account to be closed that are referenced in other accounts.

1. Checkout a new branch in the infrastructure repository
1. Remove the folder(s) containing the resources you want to destroy
1. Commit your changes and create a Pull Request which will trigger Gruntwork Pipelines to destroy the resource once the Pull Request is merged.

    :::danger
    Make sure you are deleting the correct resources in the right account and that you have a backup of any data you may need in the future.

    It is not recommended that you delete the AWS IAM OIDC provider or the AWS IAM roles used by Pipelines within the AWS account before closing the account. This ensures that you can continue to use Pipelines to manage resources within it (including destroying resources) prior to its full closure.
    :::

#### 2. Close the account(s) in AWS Organizations

Using the AWS Console's Organizations interface for closing an account and destroying all of its resources is preferred due to current [flakiness](https://github.com/hashicorp/terraform-provider-aws/issues/31705) of the AWS Service Catalog when performing deletes via OpenTofu/Terraform providers. AWS Organizations will permanently [close an account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-closing.html) after 90 days.

1. Authenticate to your Management Account's AWS console with the necessary permissions to close accounts.
2. Visit the [AWS Organizations page](https://console.aws.amazon.com/organizations).
3. For each account targeted for deletion, select the "close" option.


### Update the new AWS account request

You may update some attributes of an AWS Account by modifying the account request file in `_new_account_requests`. See below for steps to update each attribute.

Start by creating a new branch that will contain your changes.

1. Update the name of the OU by modifying the `organizational_unit_name` key
1. Updating the account admin user by modifying the `sso_user_first_name`, `sso_user_last_name`, and `sso_user_email` keys to the new users first name, last name, and email.

After you have made your modifications, push your branch and create a pull request. Gruntwork Pipelines will detect the account changes and run a `plan` operation. Review the output of the `plan` to confirm the output is as expected. Once confirmed, merge the PR to apply the changes.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "8381725d0952ccd0d59c1cdaf1dbbe87"
}
##DOCS-SOURCER-END -->
