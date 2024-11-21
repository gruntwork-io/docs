# Using the Account Factory Workflow

## Introduction

The Account Factory Workflow in your `infrastructure-live-root` repository can be used to vend new AWS accounts. It takes a single input consisting of a JSON payload that you can generate from the `account-factory-inputs.html` web page.

We use a JSON payload to support more vending options, as GitHub Workflows are limited to only 10 inputs.

:::note
This guide pertains only to non-delegated repositories. Enterprise customers are also able to [use Account Factory to create new Delegated Repositories](/2.0/docs/accountfactory/guides/delegated-repositories).
:::

### Step 1 - Download the file

Navigate to your `infrastructure-live-root` repository and download the inputs web page located at `.github/workflows/account-factory-inputs.html` to your local machine.

### Step 2 - Populate the values

Open `account-factory-inputs.html` in a web browser and populate the input options.

At the end of the page click "Generate", and copy the JSON output into your clipboard.

### Step 3 - Run the Account Factory Workflow

In GitHub, navigate to the Actions tab of your `infrastructure-live-root` repository and select `Account factory` on the left hand pane.

Select "Run workflow" on the right and paste in the generated JSON payload into the dropdown.

Click the green "Run workflow" button in the dropdown and your workflow will begin running.

### Step 4 - Merge the Account Request PR

Once the workflow has completed a new Pull Request will be opened in your `infrastructure-live-root` repository adding an account request to the `_new-account-requests` directory.

Review and merge the pull request to being creating the account.

When the account request PR has been merged into your main branch, Pipelines will begin creating the new account in AWS. This can take some time (generally 10 to 15 minutes though it can be up to 45).

- The SSO user created in the new account will be able to sign in using your organization’s [Access Portal Url](https://docs.aws.amazon.com/signin/latest/userguide/sign-in-urls-defined.html#access-portal-url). If the user is being invited into AWS IAM Identity Center (Successor to SSO) for this first time, they will receive an email with instructions on how to log in. Otherwise, the Portal Url can be provided by your organization’s administrator.

- The root user of the new account will receive an email and can login by following the “Forgot Password” flow in the [AWS Console’s Sign in page](https://console.aws.amazon.com/) to set a password and subsequently log in.

Once the account has been successfully created, Pipelines will open another Pull Request to baseline the new account.

### Step 5 - Merge the Account Baseline PR

Review and merge the Account Baseline Pull Request. This Pull Request contains required infrastructure for your delegated repository to plan and apply infrastructure changes in AWS, as well as account baselines and account specific infrastructure such as a VPC if configured.

The new account's IaC is tracked in your `infrastructure-live-root` as a new directory. Once the Account Baseline PR has been merged to your main branch, and Pipelines has applied the changes, you are ready to start adding new infrastructure to your new account by adding Terragrunt units to this directory.
