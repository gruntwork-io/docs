import CustomizableValue from '/src/components/CustomizableValue';

# Installing Pipelines in an existing repository with YAML configuration

This guide will walk you through the process of installing Gruntwork Pipelines in an existing repository that does not yet have Gruntwork Pipelines installed. This is useful for Gruntwork customers who have existing repositories that they would like to manage with Pipelines.

The Pipeline will be configured using [Pipelines YAML Configuration](/2.0/reference/pipelines/configurations#pipelines-configuration-options) which requires that your infrastructure code is set up with the [Gruntwork recommended folder structure](/2.0/docs/overview/concepts/infrastructure-live/#suggested-folder-hierarchy). If you wish to use an arbitrary folder structure, see the guide for [Installing Pipelines in an existing repository with Configuration as Code](/2.0/docs/pipelines/installation/addingexistingrepo).


## Prerequisites

- A [terragrunt](https://terragrunt.gruntwork.io/) repository with the [Gruntwork recommended folder structure](/2.0/docs/overview/concepts/infrastructure-live/#suggested-folder-hierarchy) that you would like to manage with Pipelines.
- An active Gruntwork Subscription with access to Pipelines. You can verify you have access by choosing the "View team in GitHub" button in your [Gruntwork Developer Portal's account page](https://app.gruntwork.io/account) if you are an admin of the organization. The link will take you to the GitHub team UI and then you can search for "pipelines" in the repositories tab to see if you have access.
- AWS credentials with permissions to create resources in the AWS account where you would like to deploy Pipelines. This is necessary to create OIDC IAM roles for Pipelines to use to auto deploy infrastructure.
- Authentication enabled for Pipelines in the repository. This is necessary to allow Pipelines to fetch repository code and deploy infrastructure. See Authentication instructions in the [Authenticating Gruntwork Pipelines](2.0/docs/pipelines/installation/authoverview) documentation.

## Setting up the Repository

### Step 1 - Accounts info

Create an `accounts.yml` file at the root of your repository with the following content and update the <CustomizableValue id="AWS_ACCOUNT_NAME" />, <CustomizableValue id="AWS_ACCOUNT_ID" />, and <CustomizableValue id="AWS_ACCOUNT_EMAIL" /> with the appropriate values for the account you are deploying to. Add as many accounts as you need to manage with Pipelines.

```yaml title="accounts.yml"
# required: Name of an account
$$AWS_ACCOUNT_NAME$$:
  # required: The AWS account ID
  id: "$$AWS_ACCOUNT_ID$$"
  # required: The email address of the account owner
  email: "$$AWS_ACCOUNT_EMAIL$$"

```

### Step 2 - Pipelines Configurations

#### Mise Configuration

Create a `.mise.toml` [mise](https://github.com/jdx/mise) file at the root of your repository with the example content [here](2.0/reference/pipelines/configurations#example-mise-configuration).

#### Pipelines YAML Configuration

Create a `.gruntwork/config.yml` file at the root of your repository with the following content and update the <CustomizableValue id="DEPLOY_BRANCH_NAME" /> with the branch name that you would like to deploy infrastructure from. See the [Pipelines Configuration Options](/2.0/reference/pipelines/configurations#pipelines-configuration-options) for more configuration options.

```yaml title=".gruntwork/config.yml"
pipelines:
  # Branch that IAC is deployed from e.g main, master, etc.
  deploy-branch-name: $$DEPLOY_BRANCH_NAME$$
```


### Step 3 - Pipelines workflow files

Create a file named `.github/workflows/pipelines.yml` in the root of your repository with the following content:

```yaml title=".github/workflows/pipelines.yml"
######################################################################################################################
# INFRASTRUCTURE CI/CD CONFIGURATION
#
# This configures GitHub Actions to implement a CI/CD pipeline for infrastructure code.
#
# The following pipeline is implemented in this configuration:
#
# - For any commit on any branch, detect all the terragrunt modules that changed between the `HEAD` of the branch and
#  `main` and run `terragrunt plan` on each of those modules.
# - For commits to `main`: Run `terragrunt apply` on each of the updated modules.
#
######################################################################################################################

name: Pipelines
run-name: "[GWP]: ${{ github.event.commits[0].message || github.event.pull_request.title || 'No commit message' }}"
on:
  push:
    branches:
      - main
    paths-ignore:
      # Workflow does not run only if ALL filepaths match the pattern. See https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-excluding-paths
      - ".github/**"
  pull_request:
    types:
      - opened
      - synchronize
      - reopened

# Permissions to assume roles and create pull requests
permissions:
  id-token: write

jobs:
  GruntworkPipelines:
    # https://github.com/gruntwork-io/pipelines-workflows/blob/v3/.github/workflows/pipelines.yml
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@v3
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      INFRA_ROOT_WRITE_TOKEN: ${{ secrets.INFRA_ROOT_WRITE_TOKEN }}
      ORG_REPO_ADMIN_TOKEN: ${{ secrets.ORG_REPO_ADMIN_TOKEN }}

  PipelinesPassed:
    needs: GruntworkPipelines
    if: always()
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "::debug::RESULT: $RESULT"
          if [[ $RESULT = "success" ]]; then
            echo "GruntworkPipelines completed successfully!"
          else
            echo "GruntworkPipelines failed!"
            exit 1
          fi
        env:
          RESULT: ${{ needs.GruntworkPipelines.result }}
```
