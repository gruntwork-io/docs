# Destroying Infrastructure with Pipelines

import CustomizableValue from '/src/components/CustomizableValue';

This tutorial will help you learn how to destroy infrastructure using Gruntwork Pipelines and GitOps workflows.

## What you'll get

By the end, you’ll have:

- Destroyed AWS resources using Gruntwork Pipelines

## Prerequisites

Before starting, make sure you have:

- Pipelines installed in a GitHub repository. Refer to [Setup & Installation](/2.0/docs/pipelines/installation/overview) for details.
- Access to a sandbox or development AWS account configured during the Pipelines installation process.
- Permissions to create a pull request in the GitHub repository where Pipelines is installed.
- An existing AWS resource created using Infrastructure as Code (IaC) and Pipelines that you want to destroy. If no resource exists, follow the steps in the [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial to create one, which will then be destroyed in this tutorial.

## Destroying with pipelines

This section explains how to destroy AWS resources using Pipelines and GitOps workflows. The example used is the S3 bucket created in the [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial, but the process applies to any resource you wish to destroy.


### Delete the infrastructure code

1. Remove the folder containing the infrastructure code for the resource you want to destroy. For the S3 bucket example, delete the folder containing the S3 bucket code. Replace <CustomizableValue id="ACCOUNT_NAME" /> and <CustomizableValue id="REGION" /> with the appropriate values.

    ```bash
    rm -rf $$ACCOUNT_NAME$$/$$REGION$$/$$ACCOUNT_NAME$$/data-storage/s3
    ```

2. Create a new branch, commit the changes, and push the branch to your GitHub repository.

### Planning the destruction

Create a Pull Request (PR) for the branch you just pushed, targeting `main` (the default branch in your repository).

![Delete Infrastructure Code](/img/pipelines/tutorial/delete-infrastructure-code.png)

Gruntwork Pipelines, via GitHub Actions (GHA), will detect the removal of the infrastructure unit's code and trigger a `plan` action in Pipelines. This action will display the destructive changes to be made to your AWS account.

![Pipelines Destroy Plan Comment](/img/pipelines/tutorial/pipelines-destroy-plan-comment.png)

### Applying the destruction

If you are satisfied with the changes shown in the `plan` action, you can proceed to destroy the S3 bucket.

Approve and merge the pull request to trigger the apply action, permanently deleting the resource from your AWS account.

Congratulations! You have successfully destroyed an AWS resource using Gruntwork Pipelines and GitOps workflows. To verify the resource has been destroyed, check your AWS management console.
