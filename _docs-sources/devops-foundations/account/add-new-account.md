# Add a new Account

To provision a new account in a control-tower managed organization using Gruntwork, follow these simple four steps:

## Prerequisites

Before proceeding, ensure the following prerequisites are met:

- A bootstrapped `infrastructure-live` repository with the [control-tower-multi-account-factory module](https://GitHub.com/gruntwork-io/terraform-aws-control-tower/tree/main/modules/landingzone/control-tower-multi-account-factory) configured in the root account.
<!-- Repo must include the multi-account factory module configured in the root account -->
- A [functional `Gruntwork Pipelines`](https://LINK-TO-VALID-DOC) setup with your `infrastructure-live` repository
- *(OPTIONAL)*: [Configured GitHub Actions](https://LINK-TO-VALID-DOC), in your `infrastructure-live` repo, to create account request PRs (Pull Requests).

## Steps

### 1. Create a New Account Request File

To initiate the process, create an `account-<DESIRED-ACCOUNT-NAME>.yml` file in `_new-account-requests` folder located in the root of your infrastructure-live repository. This file will be used to create a pull request and add the new account to your organization. The file should have the following format:

  ```yaml account-<DESIRED-ACCOUNT-NAME>.yml
  account_email: <ROOT-EMAIL-FOR-ACCOUNT>
  organizational_unit_name: <OU-TO-ADD-ACCOUNT-TO>
  aws_region: <REGION-T0-DEPLOY-BASELINES>
  org_name_prefix: <ORG-NAME-PREFIX-FOR-RESOURCES>
  sso_user_first_name: <SSO-USER-FIRST-NAME>
  sso_user_last_name: <SSO-USER-LAST-NAME>
  sso_user_email: <SSO-USER-EMAIL>
  infrastructure_modules_version: <INFRASTRUCTURE-MODULES-VERSION>
  ```

  - `account_email`: The email address to associate with the account.
  - `organizational_unit_name`: The name of the Organizational Unit(OU) where the new account will be added. Ensure this exactly matches an existing OU name in your organization, for example, "Security".
  - `aws_region`: The AWS region where the Gruntwork account baselines will be deployed. e.g., `us-east-1`
  - `org_name_prefix`: The prefix to use for some resources created by Gruntwork modules. For instance, S3 bucket files will be prefixed with this value
  - `sso_user_first_name`: The first name of the user to create in AWS IAM Identity Center (Successor to AWS Single Sign-On(SSO)).
  - `sso_user_last_name`: The last name of the user to create in AWS IAM Identity Center.
  - `sso_user_email`: The email address of the user to create in AWS IAM Identity Center. This user will be able to login to the new account using AWS IAM Identity Center.
  - `infrastructure_modules_version`: The version of the your Infrastructure modules to use for the new account. e.g., `v0.0.1`

### 2. Create a Pull Request

Next, create a pull request containing the new account request file. This action will trigger the Gruntwork pipeline to `terragrunt plan` the new account and update the pull request with the plan output.

  #### Alternatively with GitHub Actions

  If you have configured GitHub Actions in your infrastructure-live repository, with an Account Factory workflow, you can invoke that workflow via the GitHub UI or programmatically, which will automatically create the account request file and open a pull request.

### 3. Review the Plan Output & Merge the Account Request PR

Review the plan output in the pull request, once satisfied, merge the pull request to create the new account. Merging the PR will trigger the Gruntwork pipeline to `terragrunt apply` the new account. Once the pipeline completes, the new account will be created and a new pull request will also be generated to update your `infrastructure-live` repository with:

:::caution

The Current Gruntwork pipelines does not do this currently but will do so shortly.  This notice will be removed when the feature is available.

:::

- The new account details in `accounts.yml` file in the root of your `infrastructure-live` repository
- A `<DESIRED-ACCOUNT-NAME>` folder in the root of your `infrastructure-live` repository containing configurations necessary to deploy the Gruntwork account baselines into the new account.

:::tip

View the progress of the account creation by viewing the logs of the kicked-off GitHub Actions workflow for your main branch.

:::

:::info

- The SSO user created in the new account will be able to sign in using your organization's [Access Portal Url](https://docs.aws.amazon.com/signin/latest/userguide/sign-in-urls-defined.html#access-portal-url). If the user is being invited into AWS IAM Identity Center(Successor to SSO) for this first time, they will receive an email with instructions on how to log in. Otherwise, the Portal Url can be provided by your organization's administrator.

- The root user of the new account will receive an email and can login by following the "Forgot Password" flow in the [AWS Console's Sign in page](https://console.aws.amazon.com/) to set a password and subsequently log in.
<!-- https://docs.aws.amazon.com/controltower/latest/userguide/root-login.html -->

:::


### 4. Deploy Gruntwork account baselines

Once the pull request to update your `infrastructure-live` repository with the new account details is merged, the Gruntwork pipeline will automatically deploy the Gruntwork account baselines into the new account.
