# Using the Account Factory Workflow

## Introduction

The Account Factory Workflow in the `infrastructure-live-root` repository creates new AWS accounts. It requires a single input—a JSON payload—generated from the `account-factory-inputs.html` web page.

The JSON payload approach provides greater flexibility for account vending, overcoming the GitHub workflow restriction of a 10-input maximum.

:::note
This guide focuses on non-delegated repositories. Enterprise customers can also [use Account Factory to create new Delegated Repositories](/2.0/docs/accountfactory/guides/delegated-repositories).
:::

### Step 1 - Download the file

Locate the inputs web page in your `infrastructure-live-root` repository at `.github/workflows/account-factory-inputs.html` and download it to your local machine.

### Step 2 - Populate the values

Open the downloaded `account-factory-inputs.html` file in a web browser and populate the input fields as required.

Once all values are filled, click "Generate" and copy the resulting JSON output to your clipboard.

### Step 3 - Run the Account Factory Workflow

Access the Actions tab in your `infrastructure-live-root` repository on GitHub and select `Account factory` from the left-hand pane.

Click "Run workflow" on the right, paste the generated JSON payload into the dropdown, and click the green "Run workflow" button to initiate the workflow.

### Step 4 - Merge the Account Request PR

After the workflow is complete, a new Pull Request will be created in the `infrastructure-live-root` repository. This PR will add an account request to the `_new-account-requests` directory.

Review and merge the Pull Request to begin the account creation process.

Once the account request PR merges into the main branch, Pipelines will initiate the account creation in AWS. This process typically takes 10 to 15 minutes but may extend to 45 minutes.

- The SSO user created for the new account will use your organization's [Access Portal URL](https://docs.aws.amazon.com/signin/latest/userguide/sign-in-urls-defined.html#access-portal-url) to log in. New users invited to AWS IAM Identity Center (formerly AWS SSO) will receive an email with login instructions. Existing users can access the Portal URL through the organization's administrator.

- The root user of the new account will receive an email and can log in by following the "Forgot Password" process on the [AWS Console's Sign-in page](https://console.aws.amazon.com/).

When the account is successfully created, Pipelines will open another Pull Request to baseline the account.

### Step 5 - Merge the Account Baseline PR

Review and merge the Account Baseline Pull Request. This PR contains essential infrastructure for enabling your delegated repository to plan and apply infrastructure changes in AWS. It also includes account baselines and configured account-specific infrastructure, such as a VPC.

The new account's Infrastructure as Code (IaC) is tracked in `infrastructure-live-root` as a newly created directory. Once the Account Baseline PR merges into the main branch and Pipelines applies the changes, you can add infrastructure to the new account by creating Terragrunt units in the directory.
