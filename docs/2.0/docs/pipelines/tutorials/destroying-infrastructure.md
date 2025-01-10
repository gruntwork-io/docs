# Destroying infrastructure with Pipelines

import CustomizableValue from '/src/components/CustomizableValue';

In this Tutorial, you'll learn how to destroy infrastructure using Gruntwork Pipelines and GitOps workflows.

## What you'll get

By the end, you’ll have:

- Destroyed AWS resources using Gruntwork Pipelines

## Prerequisites

Before you begin, make sure you have:

- Pipelines installed in a GitHub repository. See [Setup & Installation](/2.0/docs/pipelines/installation/overview) for more information.
- A sandbox or development AWS account that was set up during the Pipelines installation process
- Permissions to create a pull request in the GitHub repository where Pipelines is installed
- An existing AWS resource that you want to destroy which was created using Infrastructure as Code (IaC) and Pipelines. If you don't have an existing resource, you can follow the steps in the [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial to create one and that is what we will destroy in this tutorial.

## Destroying with Pipelines

In this section, you’ll destroy an existing AWS resource using Pipelines and GitOps workflows. We will use the same S3 bucket created in the [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial as an example but you can replace it with any other resource you want to destroy.

### Delete the Infrastructure Code

1. Delete the folder containing the infrastructure code for the resource you want to destroy. In this case, delete the folder containing the S3 bucket code. Replace <CustomizableValue id="ACCOUNT_NAME" /> and <CustomizableValue id="REGION" /> appropriately.

    ```bash
    rm -rf $$ACCOUNT_NAME$$/$$REGION$$/$$ACCOUNT_NAME$$/data-storage/s3
    ```

2. Create a new branch, commit the changes, and push the branch to your GitHub repository.

### Planning the destruction

Create a Pull Request (PR) for the branch you just pushed against `main`(the default branch in your repository).

![Delete Infrastructure Code](/img/pipelines/tutorial/delete-infrastructure-code.png)

Gruntwork Pipelines via the GitHub Action(GHA), will detect the removal of this infrastructure unit's code and trigger a `plan` action in Pipelines that will show you the destructive changes that will be made to your AWS account.

![Pipelines Destroy Plan Comment](/img/pipelines/tutorial/pipelines-destroy-plan-comment.png)


### Applying the destruction

If you are satisfied with the changes shown in the `plan` action then you are ready to destroy the S3 bucket.

Approve and merge the PR to trigger an `apply` action that will destroy the resource in your AWS account.

<!-- Add Image -->
<!--  Pipelines Destroy Apply Comment](/img/pipelines/tutorial/pipelines-destroy-apply-comment.png) -->

Congratulations! You have successfully destroyed an AWS resource using Gruntwork Pipelines and GitOps workflows. To verify the resource has been destroyed, check your AWS management console.
