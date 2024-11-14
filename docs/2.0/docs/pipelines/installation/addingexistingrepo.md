import CustomizableValue from '/src/components/CustomizableValue';

# Adding Pipelines to an existing repository

This guide will walk you through the process of installing Gruntwork Pipelines in an existing repository that does not yet have Gruntwork Pipelines installed. This is useful for Gruntwork customers who have existing repositories that they would like to manage with Pipelines.

:::info

This process is supported via a new configuration paradigm for Pipelines referred to as ["Pipelines Configuration as Code"](/2.0/reference/pipelines/configurations-as-code) released in July 2024. This new system allows developers to use Gruntwork Pipelines with arbitrary folder layouts inside their IaC repositories. Prior to this system, pipelines required using a specific folder layout in order to map folders in source control to AWS Accounts for authentication. **As of Q4 2024 this new configuration system does not yet support [Gruntwork Account Factory](https://docs.gruntwork.io/2.0/docs/accountfactory/concepts/)** so if you need both Pipelines and Account factory we strongly advise you to start with a [new repository](/2.0/docs/pipelines/installation/addingnewrepo) or contact [Gruntwork support](/support) for assistance.
:::

## Prerequisites

- An active Gruntwork Subscription with access to Pipelines. You can verify you have access by choosing the "View team in GitHub" button in your [Gruntwork Developer Portal's account page](https://app.gruntwork.io/account) if you are an admin of the organization. The link will take you to the GitHub team UI and then you can search for "pipelines" in the repositories tab to verify you have access.
- AWS credentials with permissions to create resources in the AWS account where you would like to deploy Pipelines. This is necessary to create OpenID Connect(OIDC) Provider and AWS Identity and Access Management(IAM) roles for Pipelines to use to auto deploy infrastructure.

## Setting up the Repository

### Accounts info

Create the following files and directories in your repository:

1. An `accounts.yml` file at the root of your repository with the content below. Update the <CustomizableValue id="AWS_ACCOUNT_NAME" />, <CustomizableValue id="AWS_ACCOUNT_ID" />, and <CustomizableValue id="AWS_ACCOUNT_EMAIL" /> with the appropriate values for the account you are deploying to. Add as many accounts as you need to manage with Pipelines.

    ```yaml title="accounts.yml"
    # required: Name of an account
    $$AWS_ACCOUNT_NAME$$:
      # required: The AWS account ID
      id: "$$AWS_ACCOUNT_ID$$"
      # required: The email address of the account owner
      email: "$$AWS_ACCOUNT_EMAIL$$"
    ```

1. An `account.hcl` file within the account directory with the content below. Update the <CustomizableValue id="AWS_S3_STATE_BUCKET_PATTERN" /> by specifying the exact bucket name or pattern that matches. This file will be used as shared configuration across terragrunt units in the account. Repeat this step for each account you would like to manage with Pipelines.

    ```hcl title="$$AWS_ACCOUNT_NAME$$/account.hcl"
    locals {
      account_name         = "$$AWS_ACCOUNT_NAME$$"
      # Name or pattern of the state bucket for this account. Usable in all terragrunt units in this $$AWS_SECURITY$$ account.
      state_bucket_pattern = lower("$$AWS_S3_STATE_BUCKET_PATTERN$$")
    }
    ```

### Pipelines Configurations

Create a file called `.gruntwork/gruntwork.hcl` in the root of your repository with the [unit configuration](/2.0/docs/pipelines/configuration/config-as-code#unit-configurations) below. This file will be used to configure Pipelines for your repository. Update the <CustomizableValue id="AWS_ACCOUNT_ID" /> with the appropriate values for the account you are deploying to.

```hcl title=".gruntwork/gruntwork.hcl"
# Configurations applicable to entire repository
repository {
  deploy_branch_name = "main"
}

# Configurations applicable to each account
unit {
  authentication {
    aws_oidc {
      account_id         = "$$AWS_ACCOUNT_ID$$"
      plan_iam_role_arn  = "arn:aws:iam::$$AWS_ACCOUNT_ID$$:pipelines-plan-role"
      apply_iam_role_arn = "arn:aws:iam::$$AWS_ACCOUNT_ID$$:pipelines-apply-role"
    }
  }
}
```

The IAM roles referenced in the unit configuration above will be created later in [Pipeline OpenID Connect(OIDC) Provider and Roles](#pipelines-openid-connectoidc-provider-and-roles) section.

You may add new unit configurations for each additional account or consider an [environment configuration](/2.0/docs/pipelines/configuration/config-as-code#environment-configurations).

## Installing the Pipelines workflow files

Pipelines is implemented as a GitHub [reusable workflow](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#creating-a-reusable-workflow). This means that the code to implement Pipelines and all of its features lives in an external repository (generally you'll point to [ours](https://github.com/gruntwork-io/pipelines-workflows/)) and the code in your repository simply makes a reference.

* Create a file called `.github/workflows/pipelines.yml`
* The contents of the file should be sourced from our template [here](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/blob/main/templates/devops-foundations-infrastructure-live-root/.github/workflows/pipelines.yml)
* NOTE: As of writing this in October 2024 the above template points to a [boilerplate](https://github.com/gruntwork-io/boilerplate) template; the file is meant to be rendered by boilerplate into a usable file.  Please reach out to your Gruntwork solutions architect for assistance if you need help rendering the template.

### Step 3 - Pipelines GitHub Actions(GHA) workflow file

Create a file named `.github/workflows/pipelines.yml` in the root of your repository with the following content:

<details>
<summary>Pipelines GHA workflow file</summary>

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
      - $$DEPLOY_BRANCH_NAME$$
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

</details>

### Pipelines OpenID Connect(OIDC) Provider and Roles

We will create the infrastructure as code for the OIDC roles that Pipelines will use to deploy infrastructure. Pipelines will use two roles; one to perform a plan and another to perform an apply to maintain the principle of least privilege. This step in the process will require the AWS credentials with the necessary permissions to create the OIDC resources that Pipelines will be able to automatically assume to deploy infrastructure after we have completed the setup.


#### Create the terragrunt units

Within the "*<CustomizableValue id="AWS_ACCOUNT_NAME" />/_global*" folder, create the terragrunt unit files below. Repeat this step for each account you would like to manage with Pipelines.


<details>
<summary>OIDC Provider</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/github-actions-openid-connect-provider/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

inputs = {
  allowed_organizations = [
    "oredavids",
  ]
}
```

</details>

<details>
<summary>Pipelines Plan</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/pipelines-plan-role/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# The OIDC IAM roles for GitHub actions require a provisioned IAM OpenID Connect Provider for each account.
# The underlying module used in envcommon can create the OIDC provider. Since we have multiple OIDC roles, we use a
# dedicated module and all roles depend on its output
dependency "github-actions-openid-connect-provider" {
  config_path = "../github-actions-openid-connect-provider"

  # Configure mock outputs for the `validate` command that are returned when there are no outputs available (e.g the
  # module hasn't been applied yet.
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs_merge_strategy_with_state  = "shallow"
  mock_outputs = {
    arn = "known_after_apply"
    url = "token.actions.githubusercontent.com"
  }
}

locals {
  # Automatically load account-level variables
  account_vars         = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  state_bucket_pattern = local.account_vars.locals.state_bucket_pattern
}

inputs = {
  github_actions_openid_connect_provider_arn = dependency.github-actions-openid-connect-provider.outputs.arn
  github_actions_openid_connect_provider_url = dependency.github-actions-openid-connect-provider.outputs.url

  allowed_sources_condition_operator = "StringLike"

  allowed_sources = {
    "oredavids/infrastructure-live" : ["*"]
  }

  custom_iam_policy_name = "pipelines-plan-oidc-policy"
  iam_role_name          = "pipelines-plan"

  # Policy based on these docs:
  # https://terragrunt.gruntwork.io/docs/features/aws-auth/#aws-iam-policies
  iam_policy = {
    # State permissions
    "DynamoDBLocksTableAccess" = {
      effect = "Allow"
      actions = [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:DescribeTable",
        "dynamodb:DeleteItem",
        "dynamodb:CreateTable",
      ]
      resources = ["arn:aws:dynamodb:*:*:table/terraform-locks"]
    }
    "S3StateBucketAccess" = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetBucketVersioning",
        "s3:GetBucketAcl",
        "s3:GetBucketLogging",
        "s3:CreateBucket",
        "s3:PutBucketPublicAccessBlock",
        "s3:PutBucketTagging",
        "s3:PutBucketPolicy",
        "s3:PutBucketVersioning",
        "s3:PutEncryptionConfiguration",
        "s3:PutBucketAcl",
        "s3:PutBucketLogging",
        "s3:GetEncryptionConfiguration",
        "s3:GetBucketPolicy",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutLifecycleConfiguration",
        "s3:PutBucketOwnershipControls",
      ]
      resources = [
        "arn:aws:s3:::${local.state_bucket_pattern}",
      ]
    }
    "S3StateBucketObjectAccess" = {
      effect = "Allow"
      actions = [
        "s3:PutObject",
        "s3:GetObject"
      ]
      resources = [
        "arn:aws:s3:::${local.state_bucket_pattern}/*",
      ]
    }
  }
}
```

</details>

<details>
<summary>Pipelines Apply</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/pipelines-apply-role/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# The OIDC IAM roles for GitHub actions require a provisioned IAM OpenID Connect Provider for each account.
# The underlying module used in envcommon can create the OIDC provider. Since we have multiple OIDC roles, we use a
# dedicated module and all roles depend on its output
dependency "github-actions-openid-connect-provider" {
  config_path = "../github-actions-openid-connect-provider"

  # Configure mock outputs for the `validate` command that are returned when there are no outputs available (e.g the
  # module hasn't been applied yet.
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs_merge_strategy_with_state  = "shallow"
  mock_outputs = {
    arn = "known_after_apply"
    url = "token.actions.githubusercontent.com"
  }
}

locals {
  # Automatically load account-level variables
  account_vars         = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  state_bucket_pattern = local.account_vars.locals.state_bucket_pattern
}

inputs = {
  github_actions_openid_connect_provider_arn = dependency.github-actions-openid-connect-provider.outputs.arn
  github_actions_openid_connect_provider_url = dependency.github-actions-openid-connect-provider.outputs.url

  allowed_sources = {
    "oredavids/infrastructure-live" : ["main"]
  }

  # Policy for OIDC role assumed from GitHub in the "oredavids/infrastructure-live" repo
  custom_iam_policy_name = "pipelines-apply-oidc-policy"
  iam_role_name          = "pipelines-apply"

  # Policy based on these docs:
  # https://terragrunt.gruntwork.io/docs/features/aws-auth/#aws-iam-policies
  iam_policy = {
    # State permissions
    "DynamoDBLocksTableAccess" = {
      effect = "Allow"
      actions = [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:DescribeTable",
        "dynamodb:DeleteItem",
        "dynamodb:CreateTable",
      ]
      resources = ["arn:aws:dynamodb:*:*:table/terraform-locks"]
    }
    "S3StateBucketAccess" = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetBucketVersioning",
        "s3:GetBucketAcl",
        "s3:GetBucketLogging",
        "s3:CreateBucket",
        "s3:PutBucketPublicAccessBlock",
        "s3:PutBucketTagging",
        "s3:PutBucketPolicy",
        "s3:PutBucketVersioning",
        "s3:PutEncryptionConfiguration",
        "s3:PutBucketAcl",
        "s3:PutBucketLogging",
        "s3:GetEncryptionConfiguration",
        "s3:GetBucketPolicy",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutLifecycleConfiguration",
        "s3:PutBucketOwnershipControls",
      ]
      resources = [
        "arn:aws:s3:::${local.state_bucket_pattern}",
      ]
    }
    "S3StateBucketObjectAccess" = {
      effect = "Allow"
      actions = [
        "s3:PutObject",
        "s3:GetObject"
      ]
      resources = [
        "arn:aws:s3:::${local.state_bucket_pattern}/*",
      ]
    }
  }
}
```

</details>


:::tip

The permissions in the above files are examples and should be updated based on the type of infrastructure contained in the repository. The permissions should be updated to allow the OIDC roles to perform the necessary actions to deploy your infrastructure.

:::


#### Create the OIDC resources

Using the necessary AWS credentials, run the following commands to deploy the infrastructure for the terragrunt units we created in the previous step. Repeat this step for each account you would like to manage with Pipelines.

    ```bash
    cd $$AWS_ACCOUNT_NAME$$/_global
    terragrunt run-all plan
    ```

Review the plan output and if it looks good, apply the changes.


  ```bash
  terragrunt run-all apply
  ```

:::tip

If you encounter issues with the plan or apply steps due to existence of other resources already in the *_global* folder, you can run plan/apply for the terragrunt units individually starting with the `github-actions-openid-connect-provider` unit because the other units depend on it.

:::

#### Commit and push the changes

Create a branch, and commit all your changes with a **`[skip ci]`** text included in the commit message to avoid triggering the Pipelines workflow. Push the changes to the repository, create a Pull Request, and merge the changes to the <CustomizableValue id="DEPLOY_BRANCH_NAME" /> branch you specified in the `.github/workflows/pipelines.yml` file.


## Enable GitHub Authentication for Pipelines

Follow the instructions in [Authenticating via GitHub App](/2.0/docs/pipelines/installation/viagithubapp) to enable GitHub authentication for Pipelines in your repository using the Gruntwork.io GitHub App. This is the recommended way to authenticate Pipelines with GitHub in your repository but you may also [Authenticate via Machine Users](/2.0/docs/pipelines/installation/viamachineusers) if you prefer.

## Next Steps

You have successfully completed the installation for Gruntwork Pipelines in your existing repository. Follow [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial to test the installation and deploy your first infrastructure using Gruntwork Pipelines.

