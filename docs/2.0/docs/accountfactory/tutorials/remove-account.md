# Removing an AWS Account

## Prerequisites

This page is intended for users who:
- Are actively running Gruntwork Account Factory
- Have access to an AWS user or IAM Role with administrative permissions to AWS Control Tower

## Procedure

We recommend a two-step process to close AWS accounts managed by DevOps Foundations:

1. [Cleanup Infrastructure Code](#1-cleanup-infrastructure-code) and modify OpenTofu/Terraform state for the Control Tower module.
1. [Close Account with Clickops](#2-close-the-accounts-in-aws-organizations)

We recommend using ClickOps to close accounts instead of Gruntwork Pipelines. Removing the account through Pipelines by deleting the account request file often fails due to the unreliable AWS Service Catalog used with Control Tower (see [issue](https://github.com/hashicorp/terraform-provider-aws/issues/31705)), which frequently requires multiple retries. This procedure addresses those reliability issues.


### 1. Clean up infrastructure code

After making all necessary code changes, commit them to Git with **[skip ci]** in the message to avoid triggering Gruntwork Pipelines CI workflows.


#### Root/Central infrastructure repository

1. Obtain AWS CLI credentials for your *management* account
2. Create a new branch in your central/root infrastructure repository
3. Navigate to the `_new-account-requests` folder in the repository
4. Delete the account request file for each account to be removed

    :::danger

    Make sure you delete the correct account request file and do not attempt to delete more than five accounts at once, as [Control Tower has concurrent operations limit of 5](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/main/modules/landingzone/control-tower-account-factory#resourceinuseexception).

    :::

5. Edit the `accounts.yml` file in the repository to remove data for the accounts being deleted
6. Remove the targeted account(s) from the Control Tower module in the *management* account by running these commands:

    ```bash
    cd management/_global/control-tower-multi-account-factory/ # Navigate to the Control Tower module directory
    terragrunt plan # Verify no accounts are set for destruction but outputs are updated
    terragrunt apply # Apply the changes.
    ```
7. (Optional)  Remove AWS Transit Gateway (TGW) attachments if the account uses AWS TGW by running:

    ```bash
    cd <NETWORK-ACCOUNT>/_global/transit_gateway_attachments/
    terragrunt plan
    terragrunt apply
    ```
This is a plan/apply operation because the TGW module reads the `accounts.yml` file to determine which accounts are attached to the TGW.
8. Delete the folders for the targeted accounts from the repository
9. Commit the changes to your branch, including `[skip ci]` in the commit message
10. Open a Pull Request and verify that `Pipelines Plan` is absent
11. Approve and **squash-merge** the Pull Request (if multiple commits exist), again including [skip ci] in the commit message. This step will prevent Gruntwork Pipelines from initiating any destruction processes

##### Delegated infrastructure repository (Enterprise-only)

For accounts created in a separate delegated infrastructure repository:

1. If all accounts in a delegated repository are closed, delete the entire repository. Otherwise, delete only the folders for the closed accounts
2. Create and merge a Pull Request with [skip ci] in the commit message
3. If delegated repositories were removed, **and** you have a setup that includes an `infrastructure-pipelines` repository; update the `infrastructure-pipelines` repository by removing references to the deleted repositories in the `.gruntwork/config` file via a Pull Request

##### Access control infrastructure repository (Enterprise-only)
 
If an `infrastructure-access-control` repository is part of your setup:

1. Remove the deleted account references from the accounts.yml file
2. Delete the folders for the removed accounts from the repository
3. Create and merge a Pull Request with [skip ci] in the commit message

##### (Optional) Destroy resources in account before closing

If necessary, destroy resources provisioned in the account before closing it.

You may need to delete resources if you encounter issues with coordination between different accounts where resources remain present in the account to be closed that are referenced in other accounts.

1. Create a new branch in the infrastructure repository
2. Remove the folders containing the resources to be destroyed
3. Commit changes and create a Pull Request, which will trigger Gruntwork Pipelines to destroy the resources upon merging

:::danger
   
   Make sure you delete the correct resources and back up any data needed for future use.

   Do not delete the AWS IAM OIDC provider or IAM roles used by Pipelines in the account to ensure Pipelines can manage resources, including destroying them, before the account is fully closed.
   
  ::

### 2. Close the account(s) in AWS Organizations

Use the AWS Console's Organizations interface to close accounts and destroy all resources, as it is more reliable than using OpenTofu/Terraform providers due to [AWS Service Catalog issues](https://github.com/hashicorp/terraform-provider-aws/issues/31705). AWS Organizations will permanently [close an account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-closing.html) after 90 days.

1. Log in to your management account's AWS Console with permissions to close accounts
2. Visit the AWS Organizations page [AWS Organizations page](https://console.aws.amazon.com/organizations)
3. For each account targeted for deletion, select the "close" option
