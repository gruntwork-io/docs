# Add a new AWS account

This document provides instructions for provisioning a new AWS account using Gruntwork Landing Zone. The described workflow gives you the flexibility to require approval for all new AWS account requests in accordance with the permissions configured in your git repository.

## Prerequisites

Before proceeding, ensure you have:

- A repository named `infrastructure-live` which contains the [`control-tower-multi-account-factory` module](https://GitHub.com/gruntwork-io/terraform-aws-control-tower/tree/main/modules/landingzone/control-tower-multi-account-factory) configured in the root account. Use the [Gruntwork infrastructure-live template](/foundations/iac-foundations/initial-setup#infrastructure-live-template) to create your repository if you do not already have one.
- An installation of [Gruntwork Pipelines](/pipelines/overview)

## 1. Create an AWS account request file

To initiate the process, create an `account-<AWS-ACCOUNT-NAME>.yml` file in the `_new-account-requests` folder located in the root of your `infrastructure-live` repository. This file will be used to create a pull request and add the new account to your organization. The file should have the following format:

```yaml account-<AWS-ACCOUNT-NAME>.yml
account_name: <AWS-ACCOUNT_NAME>
account_email: <ROOT-EMAIL-FOR-ACCOUNT>
organizational_unit_name: <OU-TO-ADD-ACCOUNT-TO>
aws_region: <REGION-T0-DEPLOY-BASELINES>
org_name_prefix: <ORG-NAME-PREFIX-FOR-RESOURCES>
sso_user_first_name: <SSO-USER-FIRST-NAME>
sso_user_last_name: <SSO-USER-LAST-NAME>
sso_user_email: <SSO-USER-EMAIL>
account_baseline_modules_version: <ACCOUNT-BASELINE-MODULES-VERSION>
requested_by: <GITHUB_USER_ID_OR_EMAIL>
```

- `account_name`: The name of the account in AWS.
- `account_email`: The email address to associate with the account.
- `organizational_unit_name`: The name of the Organizational Unit(OU) where the new account will be added. Ensure this exactly matches an existing OU name in your organization, for example, “Security”.
- `aws_region`: The AWS region where the Gruntwork account baselines will be deployed. e.g., `us-east-1`.
- `org_name_prefix`: The prefix to use for some resources created by Gruntwork modules. For instance, S3 bucket files will be prefixed with this value
- `sso_user_first_name`: The first name of the user to create in AWS IAM Identity Center (Successor to AWS Single Sign-On(SSO)).
- `sso_user_last_name`: The last name of the user to create in AWS IAM Identity Center.
- `sso_user_email`: The email address of the user to create in AWS IAM Identity Center. This user will be able to login to the new account using AWS IAM Identity Center.
- `account_baseline_modules_version`: The version of the your account baseline modules to use for the new account. e.g., `v0.0.1`
- `requested_by`: The GitHub user ID or email address of the entity requesting the new account, for audit purposes.

:::note

If you have configured GitHub Actions in your `infrastructure-live` repository with a Gruntwork Landing Zone Account Factory workflow, you can invoke that workflow via the GitHub UI or programmatically. This workflow will automatically create the account request file and open a pull request on your behalf. After doing so, jump to [step 3](#3-review-and-merge-the-account-request-pr).

:::

## 2. Create a pull request

Next, create a pull request containing the new account request file. This action will trigger the Gruntwork pipeline to `terragrunt plan` the new account and update the pull request with the plan output.

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
