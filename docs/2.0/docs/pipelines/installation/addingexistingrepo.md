import CustomizableValue from '/src/components/CustomizableValue';

# Adding Gruntwork Pipelines to an existing repository

This guide provides instructions for installing Gruntwork Pipelines in a repository with existing IaC. This guide is for Gruntwork customers looking to integrate Pipelines into their existing repositories for streamlined infrastructure management.

:::info

This process leverages a new configuration paradigm for Pipelines called ["Pipelines Configuration as Code"](/2.0/reference/pipelines/configurations-as-code), introduced in July 2024. This system allows developers to use Gruntwork Pipelines with any folder structure in their IaC repositories. Previously, Pipelines required a specific folder layout to map source control directories to AWS Accounts for authentication. 

**As of Q4 2024, this new configuration system does not yet support the [Gruntwork Account Factory](https://docs.gruntwork.io/2.0/docs/accountfactory/concepts/).** If you need both Pipelines and the Account Factory, we recommend [starting with a new repository](/2.0/docs/pipelines/installation/addingnewrepo) or contacting [Gruntwork support](/support) for assistance.
:::

## Prerequisites

- **Active Gruntwork subscription**: Ensure your account includes access to Pipelines. Verify access by navigating to the "View team in GitHub" option in the [Gruntwork Developer Portal's account page](https://app.gruntwork.io/account) if you are an admin. From the GitHub team UI, search for "pipelines" under the repositories tab to confirm access.
- **AWS credentials**: You need credentials with permissions to create resources in the AWS account where Pipelines will be deployed. This includes creating an OpenID Connect (OIDC) Provider and AWS Identity and Access Management (IAM) roles for Pipelines to use when deploying infrastructure.

## Setting up the repository

### Account information

Create an `accounts.yml` file in the root directory of your repository with the following content. Replace <CustomizableValue id="AWS_ACCOUNT_NAME" />, <CustomizableValue id="AWS_ACCOUNT_ID" />, and <CustomizableValue id="AWS_ACCOUNT_EMAIL" /> with the appropriate values for the account you are deploying to. Add additional accounts as needed to manage them with Pipelines.

    ```yaml title="accounts.yml"
    # required: Name of an account
    $$AWS_ACCOUNT_NAME$$:
      # required: The AWS account ID
      id: "$$AWS_ACCOUNT_ID$$"
      # required: The email address of the account owner
      email: "$$AWS_ACCOUNT_EMAIL$$"
    ```

### Pipelines configurations

Create a file named `.gruntwork/gruntwork.hcl` in the root directory of your repository with the following content. This file is used to configure Pipelines for your repository. Update the specified placeholders with the appropriate values:

- <CustomizableValue id="ENVIRONMENT_NAME" />: Specify a name that represents the environment being deployed, such as `production`, `staging`, or `development`.
- <CustomizableValue id="PATH_TO_ENVIRONMENT" />: Define the root-relative path to the folder containing the Terragrunt units for the environment. This may match the environment name if a directory in the repository root holds all the Terragrunt units for that environment.
- <CustomizableValue id="AWS_ACCOUNT_ID" />: Enter the AWS Account ID associated with the deployment of Terragrunt units for the specified environment.
- <CustomizableValue id="DEPLOY_BRANCH_NAME" />: Specify the branch name used for deployments, such as `main` or `master`. This branch will trigger the Pipelines apply workflow when changes are merged. Pull requests targeting this branch will trigger the Pipelines plan workflow.


```hcl title=".gruntwork/gruntwork.hcl"
# Configurations applicable to the entire repository https://docs.gruntwork.io/2.0/docs/pipelines/installation/addingexistingrepo#repository-blocks
repository {
  deploy_branch_name = "$$DEPLOY_BRANCH_NAME$$"
}

aws {
  accounts "all" {
    // Reading the accounts.yml file from the root of the repository
    path = "../accounts.yml"
  }
}

# Configurations that are applicable to a specific environment within a repository # https://docs.gruntwork.io/2.0/docs/pipelines/installation/addingexistingrepo#environment-blocks
environment "$$ENVIRONMENT_NAME$$" {
  filter {
    paths = ["$$PATH_TO_ENVIRONMENT$$/*"]
  }

  authentication {
    aws_oidc {
      account_id         = aws.accounts.all.$$AWS_ACCOUNT_NAME$$.id
      plan_iam_role_arn  = "arn:aws:iam::${aws.accounts.all.$$AWS_ACCOUNT_NAME$$.id}:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::${aws.accounts.all.$$AWS_ACCOUNT_NAME$$.id}:role/pipelines-apply"
    }
  }
}
```

The IAM roles mentioned in the unit configuration above will be created in the [Pipelines OpenID Connect (OIDC) Provider and Roles](#pipelines-openid-connectoidc-provider-and-roles) section.

For additional environments, you can add new [environment configurations](/2.0/reference/pipelines/configurations-as-code#environment-configurations). Alternatively, consider using [unit configuration](/2.0/reference/pipelines/configurations-as-code#unit-configurations) for Terragrunt units in your repository that do not align with an environment configuration.

### Pipelines GitHub Actions (GHA) workflow

Pipelines is implemented using a GitHub [reusable workflow](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#creating-a-reusable-workflow). The actual code for Pipelines and its features resides in an external repository, typically [Gruntwork's Pipelines Workflows repository](https://github.com/gruntwork-io/pipelines-workflows/). Your repository references this external workflow rather than containing the implementation itself.

Create a file named `.github/workflows/pipelines.yml` in the root of your repository with the following content:

<details>
<summary>Pipelines GHA workflow file</summary>

```yaml title=".github/workflows/pipelines.yml"
######################################################################################################################
# INFRASTRUCTURE CI/CD CONFIGURATION
#
# This file configures GitHub Actions to implement a CI/CD pipeline for managing infrastructure code.
#
# The pipeline defined in this configuration includes the following steps:
#
# - For any commit on any branch, identify all Terragrunt modules that have changed between the `HEAD` of the branch and
#   `main`, and run `terragrunt plan` on each of those modules.
# - For commits to `main`, execute `terragrunt apply` on each of the updated modules.
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

### Pipelines OpenID Connect (OIDC) provider and roles

This step involves creating the Infrastructure as Code (IaC) configuration for the [OIDC](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) roles required by Pipelines to deploy infrastructure.

Two roles are needed:
- `pipelines-plan` for plans
- `pipelines-apply` for applies

Using two distinct roles upholds the principle of least privilege. The `pipelines-plan` role is used during pull request creation or updates and requires primarily read-only permissions. The `pipelines-apply` role, used during pull request merges, requires read/write permissions. Additionally, these roles have different IAM trust policies. The `apply` role only trusts the deploy branch, while the `plan` role trusts all branches.

This step requires AWS credentials with sufficient permissions to create the necessary IAM resources that Pipelines will assume when deploying infrastructure.

#### Create the Terragrunt units

Within the *<CustomizableValue id="PATH_TO_ENVIRONMENT" />* directory, create the Terragrunt unit files as described below, updating the following values as needed:

- <CustomizableValue id="AWS_STATE_BUCKET_PATTERN" />: Specify the state bucket name or pattern of the state bucket(s) to be used for the environment. The Pipeline roles must have permissions to access the state bucket for storing and retrieving state files.
- <CustomizableValue id="AWS_DYNAMO_DB_TABLE" />: Specify the name of the DynamoDB table used for state locking.
- <CustomizableValue id="INFRASTRUCTURE_LIVE_REPO_NAME" />: Provide the exact name of the repository where Pipelines is being configured.

<details>
<summary>OIDC Provider</summary>

```hcl title="$$PATH_TO_ENVIRONMENT$$/_global/github-actions-openid-connect-provider/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

inputs = {
  allowed_organizations = [
    "$$GITHUB_ORG_NAME$$",
  ]
}
```

</details>

<details>
<summary>Pipelines Plan</summary>

```hcl title="$$PATH_TO_ENVIRONMENT$$/_global/pipelines-plan-role/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# The OIDC IAM roles for GitHub Actions require an IAM OpenID Connect (OIDC) Provider to be provisioned for each account.
# The underlying module used in `envcommon` is capable of creating the OIDC provider. Since multiple OIDC roles are required, 
# a dedicated module is used, and all roles depend on its output
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
  state_bucket_pattern = lower("$$AWS_STATE_BUCKET_PATTERN$$")
}

inputs = {
  github_actions_openid_connect_provider_arn = dependency.github-actions-openid-connect-provider.outputs.arn
  github_actions_openid_connect_provider_url = dependency.github-actions-openid-connect-provider.outputs.url

  allowed_sources_condition_operator = "StringLike"

  allowed_sources = {
    "$$GITHUB_ORG_NAME$$/$$INFRASTRUCTURE_LIVE_REPO_NAME$$" : ["*"]
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
      resources = ["arn:aws:dynamodb:*:*:table/$$AWS_DYNAMO_DB_TABLE$$"]
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

```hcl title="$$PATH_TO_ENVIRONMENT$$/_global/pipelines-apply-role/terragrunt.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.74.5"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# The OIDC IAM roles for GitHub Actions require an IAM OpenID Connect (OIDC) Provider to be provisioned for each account.
# The underlying module used in `envcommon` is capable of creating the OIDC provider. Since multiple OIDC roles are required, 
# a dedicated module is used, and all roles depend on its output.
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
    "$$GITHUB_ORG_NAME$$/$$INFRASTRUCTURE_LIVE_REPO_NAME$$" : ["main"]
  }

  # Policy for OIDC role assumed from GitHub in the "$$GITHUB_ORG_NAME$$/$$INFRASTRUCTURE_LIVE_REPO_NAME$$" repo
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
      resources = ["arn:aws:dynamodb:*:*:table/$$AWS_DYNAMO_DB_TABLE$$"]
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

The permissions in the files above are provided as examples and should be adjusted to align with the specific types of infrastructure managed in the repository. This ensures that Pipelines can execute the required actions to deploy your infrastructure effectively.

Additionally, note that the IAM permissions outlined above do not include permissions to modify the role itself, for security purposes.

:::

Repeat this step for each environment you would like to manage with Pipelines.

#### Create the OIDC resources

Use your personal AWS access to execute the following commands to deploy the infrastructure for the Terragrunt units created in the previous step. Repeat this process for each account you plan to manage with Pipelines.

    ```bash
    cd $$PATH_TO_ENVIRONMENT$$/_global
    terragrunt run-all plan
    ```

Review the plan output, and if everything appears correct, proceed to apply the changes.


  ```bash
  terragrunt run-all apply
  ```

:::tip

If you encounter issues with the plan or apply steps due to the presence of other resources in the *_global* folder, you can run the plan/apply steps individually for the Terragrunt units. Start with the `github-actions-openid-connect-provider` unit, as other units depend on it.

:::

#### Commit and push the changes

Create a new branch and commit all changes, including **`[skip ci]`** in the commit message to prevent triggering the Pipelines workflow. Push the changes to the repository, create a Pull Request, and merge the changes into the <CustomizableValue id="DEPLOY_BRANCH_NAME" /> branch specified in the `.github/workflows/pipelines.yml` file.

## Enable GitHub authentication for pipelines

Follow the instructions in [Authenticating via GitHub App](/2.0/docs/pipelines/installation/viagithubapp) to enable GitHub authentication for Pipelines in your repository using the Gruntwork.io GitHub App. This is the recommended authentication method. Alternatively, you can [Authenticate via Machine Users](/2.0/docs/pipelines/installation/viamachineusers) if preferred.

## Next steps

You have successfully completed the installation of Gruntwork Pipelines in an existing repository. Proceed to [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change.md) to begin deploying changes.
