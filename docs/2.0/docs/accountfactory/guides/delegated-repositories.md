# Vending Delegated Repositories
import PersistentCheckbox from '/src/components/PersistentCheckbox';

:::note
Delegated Repositories are only available to DevOps Foundations Enterprise customers.
:::

## Introduction

When using Account Factory to request new account(s) you can chose to Delegate Management of the new accounts(s). This means that a new GitHub repository will be created for the account(s) allowing developer teams to provision their own infrastructure within their accounts.

Specific permissions for IaC changes are controlled via IAM roles in your infrastructure-live-access-control repository, allowing your infrastructure team to act as a central authority for permissions.

## Steps

### 1. Update Account Factory Settings

Account Factory options are located in `.gruntwork/config.yml`. See a full description of all account factory options in the [configuration reference](/2.0/reference/accountfactory/configurations).

The followwing options are particularly relevant for delegated repositories and you may want to update them before creating the new accounts: 

#### Catalog Repositories

Catalog Repositories are what your developer teams will use when running `terragrunt catalog` within their delegated repository. This defaults to your `infrastructure-modules` reposistory but you can customize this list and the values will be vended into the newly createed repository.

[catalog-repositories](/2.0/reference/accountfactory/configurations#catalog-repositories)


#### GitHub Collaboratoes

GitHub Collaborators are a list of teams to automatically grant access to the new repository. This is optional to use as you can also manually set up access controls, but we do recommend configuring some teams and permissions to smooth out the vending process.

[github-collaborators](/2.0/reference/accountfactory/configurations#github-collaborators)

<PersistentCheckbox id="vending-delegated-repositories-1" label="Settings Up To Date" />

### 2. Requesting the Account

In a web browser open the file `.github/workflows/account-factory-inputs.html` from your `infrastructure-live-root` repository. This webpage is used to craft the initial account request payload that we will pass to the account factory workflow.

The account name field will be used as the suffix for the GitHub name of the new repository.

![Screenshot of Account Name](/img/accountfactory/account-name.png)

In the above example a new repository named `infra-live-new-account` will be created. It is important to use a unique name here that will not create a conflict with an existing repository in your GitHub Organization.

Fill out the form, and check the box "Delegate Management of Account(s)?"

![Screenshot of Delegate Management checkbox](/img/accountfactory/delegate-management.png)

Press Generate and copy the resulting JSON. This is the payload we will pass into the Account Factory workflow.

<PersistentCheckbox id="vending-delegated-repositories-2" label="Payload Created" />

### 3. Run the Account Factory Workflow

Navigate to the Actions tab in your `infrastructure-live-root` repository and select the Account Factory workflow in the left hand pane.

Select Run Workflow on the right, and paste the JSON payload into the input. Run the workflow.

![Screenshot of Account Factory Workflow Dispatch](/img/accountfactory/run-workflow.png)

<PersistentCheckbox id="vending-delegated-repositories-3" label="Account Factory Workflow Run" />

### 4. Merge the Request PR

The result of the Account Factory Workflow run will be a new Pull Request, adding a new YMAL file in the `_new-account-requests` directory.

If everything looks as expected you can merge the pull request. Once the commit is on your main branch terragrunt will kick off creating the account.

Once the account has been created another Pull Request will be created in the `infrastructure-live-root` repository to baseline the new account.

### 5. Merge the Baseline PR

Inspect the baseline PR and merge it.

This will kick off the following steps:

- Apply the baselines in your security, logs and shared accounts

- Create a new repository for your new account(s)
    - Attempt to set collaborators from your configuration
    - Attempt to set branch protection. This step can fail if you are on a free (non paid) GitHub plan.

- Create a pull request in this new repository with the base IaC and Pipelines workflows.

- Create a pull request against your `infrastructure-live-access-control` repository.

### 6. Merge the Access Control PR

Before you can merge the IaC PR in the delegated repository you need to merge the Access Control PR.

Understand how the permissions in this PR will restrict developer teams from making unwanted changes in their repository.

You can change the IAM roles in this PR to add or remove access to specific resources in the delegated infrastructure repository.


### 7. Merge the IaC Repository

Double check the repository settings. Then merge the PR.

The PR will fail to plan and apply until the access control PR above has been applied.

