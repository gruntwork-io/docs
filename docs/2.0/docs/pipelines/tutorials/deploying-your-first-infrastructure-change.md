# Deploying your first Infrastructure Change

In this tutorial, we’ll walk you through the process of deploying an S3 bucket. This is useful both as a "hello world" for Gruntwork Pipelines and also as the first step to getting you ready for Gruntwork Pipelines usage in production.

## What you'll get

By the end, you’ll have:

- An S3 Bucket deployed automatically by Gruntwork Pipelines

## Prerequisites

Before you begin, make sure you have:

- Pipelines installed in a GitHub repository. See [Setup & Installation](/2.0/docs/pipelines/installation/overview) for more information.
- A sandbox or development AWS account that was set up during the Pipelines installation process
- Permissions to create a pull request in the GitHub repository where Pipelines is installed

## Running your first pipeline

In this section, you’ll create a resource in your AWS account using Pipelines and GitOps workflows by defining a `terragrunt.hcl` file that creates an AWS S3 bucket in your AWS account, pushing your changes and creating a pull request (PR) to run a `plan` action, then merging the PR to run an `apply` action that creates the bucket.

### Adding a new S3 bucket

1. Create the folder structure that will contain the new S3 bucket in your environment. Replace `<account name>` with the value for the account you are deploying to, and `<region>` with the region you would like to deploy the S3 bucket in.

    ```bash
    mkdir -p <account name>/<region>/<account name>/data-storage/s3
    touch <account name>/<region>/region.hcl
    touch <account name>/<region>/<account name>/data-storage/s3/terragrunt.hcl
    ```

1. Add the following content to the `region.hcl` file created above

    ```hcl title="<account name>/<region>/region.hcl"
    locals {
      aws_region = "<your region>"
    }
    ```

1. Add the terragrunt code below to the created `terragrunt.hcl` file to create an S3 bucket . Replace `<your S3 bucket name>` with your desired bucket name. You may name the bucket whatever you like, just make sure it’s unique.


    ```hcl title="<account name>/<region>/<account name>/data-storage/s3/terragrunt.hcl"
    # ------------------------------------------------------------------------------------------------------
    # DEPLOY GRUNTWORK’s S3-BUCKET MODULE
    # ------------------------------------------------------------------------------------------------------

    terraform {
      source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/s3-bucket?ref=v0.116.1"
    }

    include "root" {
      path = find_in_parent_folders()
    }

    inputs = {
      primary_bucket = "<your S3 bucket name>"
    }
    ```

### Planning the changes

1. Create a new branch for your changes
1. Commit the changes to your branch, then push your branch.
1. Create a PR against `main`(the default branch in your repository). You may follow this GitHub tutorial to [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) using your preferred tool of choice.

After you create the PR, GitHub Actions (GHA) will automatically run the GHA workflow defined in `/.github/workflows/pipelines.yml` in the repository.

Once complete, Pipelines will add a comment to the PR with a summary of the `terragrunt plan` and a link to the GHA workflow logs.

![Pipelines Plan Comment](/img/pipelines/tutorial/pipelines-plan-comment.png)

Click the *View full logs* link see the full output of the Gruntwork pipelines run. You can find the *TerragruntExecute* step to view the full `terragrunt plan` that ran as a result of your changes.

![Pipelines Plan Logs](/img/pipelines/tutorial/pipelines-plan-logs.png)

### Applying the changes

If you are satisfied with the `terragrunt plan` output then you are ready to merge your PR and create the S3 bucket.

Approve the PR and click the `Merge pull request` button to merge the pull request. On merge, Pipelines will automatically run an `apply` action to provision the S3 bucket.

![Pipelines Apply Comment](/img/pipelines/tutorial/pipelines-apply-comment.png)

To view the GHA workflow run associated with the merged PR in the progress state before the *Pipelines Apply* is completed and a comment is added to the PR:

1. Navigate to the `main` branch on your repository
1. Click on the Checks icon, beside the latest commit, at the top of the file explorer
1. Click `details` next to the Pipelines workflow. This will take you to the `dispatch` job for Pipelines

![Find Pipelines Apply Logs](/img/pipelines/tutorial/find-pipelines-apply-logs.png)

Congratulations! You've just used Gruntwork Pipelines and a GitOps workflow to provision resources in AWS. To verify the S3 bucket was created, navigate to the AWS Management Console and check the S3 service for the bucket you created.

To clean up the resources created in this tutorial, follow instructions in the next tutorial [Destroying infrastructure with Pipelines](/2.0/docs/pipelines/tutorials/destroying-infrastructure#destroying-with-pipelines).
