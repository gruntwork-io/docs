# Vending Delegated Repositories
import PersistentCheckbox from '/src/components/PersistentCheckbox';

:::note
Vending Delegated Repositories by Account Factory is only available to DevOps Foundations Enterprise customers.
:::

## Introduction

When using Account Factory to request new account(s) you can chose to Delegate Management of the new accounts(s). This means that a new GitHub repository will be created for the account(s) allowing developer teams to provision their own infrastructure within their accounts.

Specific permissions for IaC changes are controlled via IAM roles in your `infrastructure-live-access-control` repository, allowing your infrastructure team to act as a central authority for permissions.

### Step 1 - Update Account Factory Settings

Account Factory options are located in `.gruntwork/config.yml`. See a full description of all account factory options in the [configuration reference](/2.0/reference/accountfactory/configurations).

The following options are particularly relevant for delegated repositories and you may want to update them before creating the new account(s):

#### Catalog Repositories

Catalog Repositories are what your developer teams will use when running `terragrunt catalog` within their delegated repository. This defaults to your `infrastructure-modules` reposistory but you can customize this list and the values will be vended into the newly createed repository.

[catalog-repositories](/2.0/reference/accountfactory/configurations#catalog-repositories)


#### GitHub Collaboratoes

GitHub Collaborators is a list of teams to automatically grant access to the new repository. This is optional to use as you can also manually set up access controls, but we do recommend configuring some teams and permissions to smooth out the vending process.

[github-collaborators](/2.0/reference/accountfactory/configurations#github-collaborators)

<PersistentCheckbox id="vending-delegated-repositories-1" label="Settings Up To Date" />

### Step 2 - Requesting the Account

In a web browser open the file `.github/workflows/account-factory-inputs.html` from your `infrastructure-live-root` repository. This webpage is used to craft the initial account request payload that we will pass to the account factory workflow.

The account name field will be used as the suffix for the GitHub name of the new repository.

![Screenshot of Account Name](/img/accountfactory/account-name.png)

In the above example a new repository named `infra-live-new-account` will be created. It is important to use a unique name here that will not create a conflict with an existing repository in your GitHub Organization.

Fill out the form, and check the box "Delegate Management of Account(s)?"

![Screenshot of Delegate Management checkbox](/img/accountfactory/delegate-management.png)

Press Generate and copy the resulting JSON. This is the payload we will pass into the Account Factory workflow.

<PersistentCheckbox id="vending-delegated-repositories-2" label="Payload Created" />

### Step 3 - Run the Account Factory Workflow

Navigate to the Actions tab in your `infrastructure-live-root` repository and select the Account Factory workflow in the left hand pane.

Select Run Workflow on the right, and paste the JSON payload into the input. Run the workflow.

![Screenshot of Account Factory Workflow Dispatch](/img/accountfactory/run-workflow.png)

<PersistentCheckbox id="vending-delegated-repositories-3" label="Account Factory Workflow Run" />

### Step 4 - Merge the Request PR

The result of the Account Factory Workflow run will be a new Pull Request, adding a new YAML file in the `_new-account-requests` directory.

If everything looks as expected you can merge the pull request. Once the commit is on your main branch Pipelines will begin running a `terragrunt apply` that will create the new account in AWS.

You can view the workflow run on the main branch. Provisioning the account(s) can take around 10 minutes to complete. Once the account has been created another Pull Request will be created in the `infrastructure-live-root` repository to baseline the new account.

![Screenshot of Apply Account Requested Workflow Summary](/img/accountfactory/apply-account-requested-summary.png)

<PersistentCheckbox id="vending-delegated-repositories-4" label="Account Request PR Merged and Account Provisioned" />

### Step 5 - Merge the Baseline PR

The new Baseline PR contains required infrastructure for your delegated repository to plan and apply infrastructure changes in AWS, as well as account baselines and account specific infrastructure such as a VPC if configured.

Inspect the baseline PR and merge it into your main branch to continue creating the account.

This will kick off the following steps:

- Terragrunt will run the core (security, logs, shared) account baselines for the new account(s)
- Terragrunt will apply baselines for your new account(s) and create the new requested infrastructure.
- Pipelines will create a new repository for your new account(s). As part of this step pipelines will also:
    - Set collaborators in the new repository from your configuration
    - Enable branch protection in the new repository. This step can fail if you are on a free (non paid) GitHub plan.

- Pipelines will create a pull request in this new repository with the base IaC and Pipelines workflows for your new account(s).

- Pipelines will create a pull request against your `infrastructure-live-access-control` repository containing IAM roles for your new repository.

On completion the workflow run will show the following summary, linking to both of the new Pull Requests.

![Screenshot of Create Delegated Repository Workflow Summary](/img/accountfactory/create-repository-summary.png)

Until the Access Control Pull Request has been merged, the workflows in your new repository will not be able to make infrastructure changes, so it is important to merge this pull request first.

<PersistentCheckbox id="vending-delegated-repositories-5" label="Account Baselined and Repository Created" />

### Step 6 - Merge the Access Control PR

Follow the link to the Access Control Pull Request and review the infrastructure changes in the PR. There are two new roles, `delegated-pipelines-apply-role` and `delegated-pipelines-plan-role` that grant permissions specifically for the new repository.

These base roles contain the minimum permissions required to merge and apply the bootstrap PR in your new repository.

You can add additional permissions by adding to the [iam_policy](/reference/modules/terraform-aws-security/github-actions-iam-role/#iam_policy) block in each role.

Managing these roles via the `infrastructure-live-access-control` repository allows your platform team to maintain full control over the specific change types that can occur in the delegated repository.

Merge the PR and allow Pipelines to apply the terragrunt changes to create the roles in AWS.

<PersistentCheckbox id="vending-delegated-repositories-6" label="Access Control PR Merged and Roles Created" />

### Step 7 - Merge the Delegated Repository Bootstrap PR

Once the Access Control PR has been merged and applied, navigate to the delegated repository and review the Bootstrap PR.

This PR contains the necessary GitHub workflow files for Pipelines to run, as well as terragrunt configuration ready to start deploying new infrastructure.

Merge this pull request and your delegated repository is read to use.

<PersistentCheckbox id="vending-delegated-repositories-7" label="Merge the Delegated Repository Bootstrap PR" />

### Step 8 - Start adding new infrastructure

To summarize, at this point you will have:
- Provisioned a new AWS account(s)
- Applied baselines for the new account(s)
- Created a new repository to manage infrastructure changes in this account(s)
- Configured new IAM roles to manage permissions in the delgated repository
- Bootstrapped the repository ready to add new infrastructure

You can now start adding new infrastructure to the delegated repository.
