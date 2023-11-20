# Add a new AWS account

This document provides instructions for provisioning a new AWS account using Gruntwork Landing Zone. The described workflow gives you the flexibility to require approval for all new AWS account requests in accordance with the permissions configured in your git repository.

## Prerequisites

Before proceeding, ensure you have:

1. An `infrastructure-live` repository created from the [Gruntwork infrastructure-live template](/foundations/iac-foundations/initial-setup#infrastructure-live-template).

  If you are just now creating your `infrastructure-live` repo, be sure to follow the Bootstrap steps in the `infrastructure-live` Readme to complete the setup before proceeding. 

1. An `infrastructure-pipelines` repository created from the [Gruntwork infrastructure-pipelines template](/foundations/iac-foundations/initial-setup#infrastructure-pipelines-template).

  If you are just now creating your `infrastructure-pipelines` repo, be sure to follow the Bootstrap steps in the `infrastructure-pipelines` Readme to complete the setup before proceeding. 

1. An installation of [Gruntwork Pipelines](/pipelines/overview)

1. Access tokens and secrets configured for both `infrastructure-live` and `infrastructure-pipelines` repos. Instructions for configuring access tokens and secrets can be found in the respective repo Readme files, as well as in [the Machine Users](/pipelines/security/machine-users) guide.

  :::info

  Your GitHub org MUST have fine-grained personal access tokens enabled before you can create the access tokens and secrets!

  :::

## 1. Create an AWS account request file

To initiate the process, you will use the GitHub Actions workflow in your `infrastructure-live` repo.

1. Navigate to your `infrastructure-live` repo and select the **Actions** tab.

1. Select the **Account Factory** workflow.

1. Select the **Run Workflow** dropdown menu and fill in the parameters.

1. Select **Run Workflow** to kick off the process.

The workflow will automatically create a PR to be reviewed.

## 3. Review and merge the account request PR

Review the `plan` output in the pull request. Once satisfied, merge the pull request to trigger creation of the new account. Gruntwork Pipelines will run `terragrunt apply` to create the new account in Control Tower.

:::tip

View account creation progress within the logs for the GitHub Actions workflow for your main branch.

:::

:::info

- The SSO user created in the new account will be able to sign in using your organization’s [Access Portal Url](https://docs.aws.amazon.com/signin/latest/userguide/sign-in-urls-defined.html#access-portal-url). If the user is being invited into AWS IAM Identity Center(Successor to SSO) for this first time, they will receive an email with instructions on how to log in. Otherwise, the Portal Url can be provided by your organization’s administrator.

- The root user of the new account will receive an email and can login by following the “Forgot Password” flow in the [AWS Console’s Sign in page](https://console.aws.amazon.com/) to set a password and subsequently log in.
<!-- https://docs.aws.amazon.com/controltower/latest/userguide/root-login.html -->

:::

## 4. Review and merge the account baseline PR

After the pipeline for the new account request completes, the new account will exist and a _second_ pull request will appear in `infrastructure-live` containing:

- Updates to the `accounts.yml` file in the root of your `infrastructure-live` repository with details for the new account
- A `<DESIRED-ACCOUNT-NAME>` folder in the root of your `infrastructure-live` repository containing configurations necessary to deploy the Gruntwork account baselines into the new account
- A new OIDC role required to install the baseline and enable Gruntwork Pipelines to run within the new account

When you merge this pull request, Gruntwork Pipelines will automatically deploy the Gruntwork account baselines into the new account and provision a role that Pipelines can assume to deploy resources into this account. Once this process completes, you may access your account and leverage Gruntwork Pipelines to make any further changes to the infrastructure in your new account.
