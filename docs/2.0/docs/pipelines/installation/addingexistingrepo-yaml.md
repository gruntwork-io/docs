import CustomizableValue from '/src/components/CustomizableValue';

# Installing Pipelines in an existing repository with YAML configuration

This guide will walk you through the process of installing Gruntwork Pipelines in an existing repository that does not yet have Gruntwork Pipelines installed. This is useful for Gruntwork customers who have existing repositories that they would like to manage with Pipelines.

The Pipeline will be configured using [Pipelines YAML Configuration](/2.0/reference/pipelines/configurations#pipelines-configuration-options) which requires that your infrastructure code is set up according to the [Gruntwork recommended folder structure](/2.0/docs/overview/concepts/infrastructure-live/#suggested-folder-hierarchy). If you wish to use an arbitrary folder structure, see the guide for [Installing Pipelines in an existing repository with Configuration as Code](/2.0/docs/pipelines/installation/addingexistingrepo).


## Prerequisites

- A [terragrunt](https://terragrunt.gruntwork.io/) repository with the [Gruntwork recommended folder structure](/2.0/docs/overview/concepts/infrastructure-live/#suggested-folder-hierarchy) that you would like to manage with Pipelines.
- An active Gruntwork Subscription with access to Pipelines. You can verify you have access by choosing the "View team in GitHub" button in your [Gruntwork Developer Portal's account page](https://app.gruntwork.io/account) if you are an admin of the organization. The link will take you to the GitHub team UI and then you can search for "pipelines" in the repositories tab to verify you have access.
- AWS credentials with permissions to create resources in the AWS account where you would like to deploy Pipelines. This is necessary to create OIDC IAM roles for Pipelines to use to auto deploy infrastructure.


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

Create a `.mise.toml` [mise](https://github.com/jdx/mise) file at the root of your repository with the example content [here](/2.0/reference/pipelines/configurations#example-mise-configuration).

#### Pipelines YAML Configuration

Create a `.gruntwork/config.yml` file at the root of your repository with the following content and update the <CustomizableValue id="DEPLOY_BRANCH_NAME" /> with the branch name that you would like to deploy infrastructure from. See the [Pipelines Configuration Options](/2.0/reference/pipelines/configurations#pipelines-configuration-options) for more configuration options.

```yaml title=".gruntwork/config.yml"
pipelines:
  # Branch that IAC is deployed from e.g main, master, etc.
  deploy-branch-name: $$DEPLOY_BRANCH_NAME$$
```


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

</details>

### Step 4 - Pipelines OpenID Connect(OIDC) Roles

We will create the infrastructure as code for the OIDC roles that Pipelines will use to deploy infrastructure. Pipelines will use two roles; one to perform a plan and another to perform an apply to maintain the principle of least privilege. This step in the process will require the AWS credentials with the necessary permissions to create the OIDC resources that Pipelines will be able to automatically assume to deploy infrastructure after we have completed the setup.

#### Create the shared Infrastructure as Code(IaC) config for the OIDC roles

Create a [modules-default](/2.0/docs/library/concepts/module-defaults) folder named `_envcommon` folder at the root of your repository. This folder and the pattern we will establish with it helps to keep your code DRY(Don't Repeat Yourself) and usable for different accounts.

Add the files below to the `_envcommon` folder and replace the <CustomizableValue id="GITHUB_ORG" /> and <CustomizableValue id="INFRASTRUCTURE_REPO_NAME" /> placeholders with the appropriate values.

<details>
<summary>Shared Pipelines Plan config</summary>


```hcl title="_envcommon/landingzone/root-pipelines-plan-role.hcl"
locals {
  # Automatically load account-level variables
  account_vars         = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  state_bucket_pattern = local.account_vars.locals.state_bucket_pattern
}

inputs = {
  allowed_sources_condition_operator = "StringLike"

  allowed_sources = {
    "$$GITHUB_ORG$$/$$INFRASTRUCTURE_REPO_NAME$$" : ["*"]
  }

  # Policy for OIDC role assumed from GitHub in the "$$GITHUB_ORG$$/$$INFRASTRUCTURE_REPO_NAME$$" repo
  custom_iam_policy_name = "root-pipelines-plan-oidc-policy"
  iam_role_name          = "root-pipelines-plan"

  # This 'root-pipelines-plan' GitHub OIDC IAM role is used by this infra-live repo, via Pipelines, to plan
  # changes to accounts. These permissions should be updated as necessary based on the type of infrastructure
  # contained in this infrastructure live repo.
  iam_policy = {
    "RDSReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "rds:Describe*",
        "rds:List*",
        "rds:Download*",
      ]
      resources = ["*"]
    }
    "CloudWatchEventsReadOnlyAccess" = {
      effect    = "Allow"
      actions   = ["events:Describe*", "events:List*"]
      resources = ["*"]
    }
    ECSReadOnlyAccess = {
      effect = "Allow"
      actions = [
        "ecs:Describe*",
        "ecs:List*",
      ]
      resources = ["*"]
    }
    "ACMReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "acm:DescribeCertificate",
        "acm:ListCertificates",
        "acm:GetCertificate",
        "acm:ListTagsForCertificate",
      ]
      resources = ["*"]
    }
    AutoScalingReadOnlyAccess = {
      effect    = "Allow"
      actions   = ["autoscaling:Describe*"]
      resources = ["*"]
    }
    "CloudTrailReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "cloudtrail:Describe*",
        "cloudtrail:List*",
        "cloudtrail:Get*",
      ]
      resources = ["*"]
    }
    "CloudWatchReadOnlyAccess" = {
      effect    = "Allow"
      actions   = ["cloudwatch:Describe*", "cloudwatch:List*"]
      resources = ["*"]
    }
    "CloudWatchLogsReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "logs:Get*",
        "logs:Describe*",
        "logs:List*",
        "logs:Filter*",
      ]
      resources = ["*"]
    }
    "ConfigReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "config:Get*",
        "config:Describe*",
        "config:List*",
        "config:Select*",
        "config:BatchGetResourceConfig",
      ]
      resources = ["*"]
    }
    "EC2ServiceReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "ec2:Describe*",
        "ec2:Get*",
      ]
      resources = ["*"]
    }
    "ECRReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "ecr:BatchGet*",
        "ecr:Describe*",
        "ecr:Get*",
        "ecr:List*",
      ]
      resources = ["*"]
    }
    "ELBReadOnlyAccess" = {
      effect    = "Allow"
      actions   = ["elasticloadbalancing:Describe*"]
      resources = ["*"]
    }
    "GuardDutyReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "guardduty:Get*",
        "guardduty:List*",
      ]
      resources = ["*"]
    }
    "IAMReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "iam:Get*",
        "iam:List*",
        "iam:PassRole*",
      ]
      resources = ["*"]
    }
    "IAMAccessAnalyzerReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "access-analyzer:List*",
        "access-analyzer:Get*",
        "access-analyzer:ValidatePolicy",
      ]
      resources = ["*"]
    }
    "KMSReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "kms:Describe*",
        "kms:Get*",
        "kms:List*",
      ]
      resources = ["*"]
    }
    "LambdaReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "lambda:Get*",
        "lambda:List*",
      ]
      resources = ["*"]
    }
    "Route53ReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "route53:Get*",
        "route53:List*",
        "route53:Test*",
        "route53domains:Check*",
        "route53domains:Get*",
        "route53domains:List*",
        "route53domains:View*",
        "route53resolver:Get*",
        "route53resolver:List*",
      ]
      resources = ["*"]
    }
    "S3ReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "s3:Get*",
        "s3:List*",
      ]
      resources = ["*"]
    }
    "SecretsManagerReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "secretsmanager:Get*",
        "secretsmanager:List*",
        "secretsmanager:Describe*",
      ]
      resources = ["*"]
    }
    "SNSReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "sns:Get*",
        "sns:List*",
        "sns:Check*",
      ]
      resources = ["*"]
    }
    "SQSReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "sqs:Get*",
        "sqs:List*",
      ]
      resources = ["*"]
    }
    "DynamoDBLocksTableAccess" = {
      effect = "Allow"
      actions = [
        "dynamodb:*",
      ]
      resources = ["arn:aws:dynamodb:*:*:table/terraform-locks"]
    }
    "S3StateBucketAccess" = {
      effect = "Allow"
      actions = [
        "s3:*",
      ]
      resources = [
        "arn:aws:s3:::${local.state_bucket_pattern}",
        "arn:aws:s3:::${local.state_bucket_pattern}/*",
      ]
    }
    "SecurityHubDeployAccess" = {
      resources = ["*"]
      actions = [
        "securityhub:Get*",
        "securityhub:Describe*",
        "securityhub:List*"
      ]
      effect = "Allow"
    }
    "MacieDeployAccess" = {
      resources = ["*"]
      actions = [
        "macie2:Get*",
        "macie2:Describe*",
        "macie2:List*"
      ]
      effect = "Allow"
    }
    "ServiceQuotaAccess" = {
      resources = ["*"]
      actions = [
        "servicequotas:Get*",
        "servicequotas:List*"
      ]
      effect = "Allow"
    }
    "ApplicationAutoScalingAccess" = {
      resources = ["*"]
      actions = [
        "application-autoscaling:Describe*",
        "application-autoscaling:List*"
      ]
      effect = "Allow"
    }
    "ApiGatewayAccess" = {
      resources = ["*"]
      actions   = ["apigateway:Get*"]
      effect    = "Allow"
    }
  }
}
```


</details>

<details>
<summary>Shared Pipelines Apply config</summary>


```hcl title="_envcommon/landingzone/root-pipelines-apply-role.hcl"
inputs = {
  allowed_sources = {
    "$$GITHUB_ORG$$/$$INFRASTRUCTURE_REPO_NAME$$" : ["main"]
  }

  # Policy for OIDC role assumed from GitHub in the "$$GITHUB_ORG$$/$$INFRASTRUCTURE_REPO_NAME$$" repo
  custom_iam_policy_name = "root-pipelines-apply-oidc-policy"
  iam_role_name          = "root-pipelines-apply"

  # This 'root-pipelines-apply' GitHub OIDC IAM role is used by this infra-live repo, via Pipelines, to deploy
  # changes to accounts. These permissions should be updated as necessary based on the type of infrastructure
  # contained in the central infra-live repo.
  iam_policy = {
    "IamPassRole" = {
      resources = ["*"]
      actions   = ["iam:*"]
      effect    = "Allow"
    }
    "IamCreateRole" = {
      resources = [
        "arn:aws:iam::*:role/aws-service-role/orgsdatasync.servicecatalog.amazonaws.com/AWSServiceRoleForServiceCatalogOrgsDataSync"
      ]
      actions = ["iam:CreateServiceLinkedRole"]
      effect  = "Allow"
    }
    "S3BucketAccess" = {
      resources = ["*"]
      actions   = ["s3:*"]
      effect    = "Allow"
    }
    "DynamoDBLocksTableAccess" = {
      resources = ["arn:aws:dynamodb:*:*:table/terraform-locks"]
      actions   = ["dynamodb:*"]
      effect    = "Allow"
    }
    "OrganizationsDeployAccess" = {
      resources = ["*"]
      actions   = ["organizations:*"]
      effect    = "Allow"
    }
    "ControlTowerDeployAccess" = {
      resources = ["*"]
      actions   = ["controltower:*"]
      effect    = "Allow"
    }
    "IdentityCenterDeployAccess" = {
      resources = ["*"]
      actions   = ["sso:*", "ds:*", "sso-directory:*"]
      effect    = "Allow"
    }
    "ECSDeployAccess" = {
      resources = ["*"]
      actions   = ["ecs:*"]
      effect    = "Allow"
    }
    "ACMDeployAccess" = {
      resources = ["*"]
      actions   = ["acm:*"]
      effect    = "Allow"
    }
    "AutoScalingDeployAccess" = {
      resources = ["*"]
      actions   = ["autoscaling:*"]
      effect    = "Allow"
    }
    "CloudTrailDeployAccess" = {
      resources = ["*"]
      actions   = ["cloudtrail:*"]
      effect    = "Allow"
    }
    "CloudWatchDeployAccess" = {
      resources = ["*"]
      actions   = ["cloudwatch:*", "logs:*"]
      effect    = "Allow"
    }
    "CloudFrontDeployAccess" = {
      resources = ["*"]
      actions   = ["cloudfront:*"]
      effect    = "Allow"
    }
    "ConfigDeployAccess" = {
      resources = ["*"]
      actions   = ["config:*"]
      effect    = "Allow"
    }
    "EC2DeployAccess" = {
      resources = ["*"]
      actions   = ["ec2:*"]
      effect    = "Allow"
    }
    "ECRDeployAccess" = {
      resources = ["*"]
      actions   = ["ecr:*"]
      effect    = "Allow"
    }
    "ELBDeployAccess" = {
      resources = ["*"]
      actions   = ["elasticloadbalancing:*"]
      effect    = "Allow"
    }
    "GuardDutyDeployAccess" = {
      resources = ["*"]
      actions   = ["guardduty:*"]
      effect    = "Allow"
    }
    "IAMDeployAccess" = {
      resources = ["*"]
      actions   = ["iam:*", "access-analyzer:*"]
      effect    = "Allow"
    }
    "KMSDeployAccess" = {
      resources = ["*"]
      actions   = ["kms:*"]
      effect    = "Allow"
    }
    "LambdaDeployAccess" = {
      resources = ["*"]
      actions   = ["lambda:*"]
      effect    = "Allow"
    }
    "Route53DeployAccess" = {
      resources = ["*"]
      actions   = ["route53:*", "route53domains:*", "route53resolver:*"]
      effect    = "Allow"
    }
    "SecretsManagerDeployAccess" = {
      resources = ["*"]
      actions   = ["secretsmanager:*"]
      effect    = "Allow"
    }
    "SNSDeployAccess" = {
      resources = ["*"]
      actions   = ["sns:*"]
      effect    = "Allow"
    }
    "SQSDeployAccess" = {
      resources = ["*"]
      actions   = ["sqs:*"]
      effect    = "Allow"
    }
    "SecurityHubDeployAccess" = {
      resources = ["*"]
      actions   = ["securityhub:*"]
      effect    = "Allow"
    }
    "MacieDeployAccess" = {
      resources = ["*"]
      actions   = ["macie2:*"]
      effect    = "Allow"
    }
    "ServiceQuotaDeployAccess" = {
      resources = ["*"]
      actions   = ["servicequotas:*"]
      effect    = "Allow"
    }
    "EKSAccess" = {
      resources = ["*"]
      actions   = ["eks:*"]
      effect    = "Allow"
    }
    "EventBridgeAccess" = {
      resources = ["*"]
      actions   = ["events:*"]
      effect    = "Allow"
    }
    "ApplicationAutoScalingAccess" = {
      resources = ["*"]
      actions   = ["application-autoscaling:*"]
      effect    = "Allow"
    }
    "ApiGatewayAccess" = {
      resources = ["*"]
      actions   = ["apigateway:*"]
      effect    = "Allow"
    }
  }
}
```


</details>

<details>
<summary>Shared OIDC config</summary>

```hcl title="_envcommon/landingzone/github-actions-openid-connect-provider.hcl"
inputs = {
  allowed_organizations = [
    "$$GITHUB_ORG$$",
  ]
}
```


</details>


:::tip

The permissions in the above files are examples and should be updated based on the type of infrastructure contained in the repository. The permissions should be updated to allow the OIDC roles to perform the necessary actions to deploy your infrastructure.

:::

#### Create the IaC for accounts using the shared config

Within the <CustomizableValue id="AWS_ACCOUNT_NAME" /> folder, create the terragrunt unit files below that reference the shared IaC created in the module-defaults folder created in the previous step. Repeat this step for each account you would like to manage with Pipelines.

<details>
<summary>Account Pipelines Plan</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/root-pipelines-plan-role.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.70.2"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# Include the component configuration, which has settings that are common for the component across all environments
include "envcommon" {
  path = "${dirname(find_in_parent_folders("common.hcl"))}/_envcommon/landingzone/root-pipelines-plan-role.hcl"
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

inputs = {
  github_actions_openid_connect_provider_arn = dependency.github-actions-openid-connect-provider.outputs.arn
  github_actions_openid_connect_provider_url = dependency.github-actions-openid-connect-provider.outputs.url
}
```

</details>

<details>
<summary>Account Pipelines Apply</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/root-pipelines-apply-role.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-iam-role?ref=v0.70.2"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# Include the component configuration, which has settings that are common for the component across all environments
include "envcommon" {
  path = "${dirname(find_in_parent_folders("common.hcl"))}/_envcommon/landingzone/root-pipelines-apply-role.hcl"
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

inputs = {
  github_actions_openid_connect_provider_arn = dependency.github-actions-openid-connect-provider.outputs.arn
  github_actions_openid_connect_provider_url = dependency.github-actions-openid-connect-provider.outputs.url
}
```

</details>

<details>
<summary>Account OIDC</summary>

```hcl title="$$AWS_ACCOUNT_NAME$$/_global/github-actions-openid-connect-provider.hcl"
terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-security.git//modules/github-actions-openid-connect-provider?ref=v0.73.0"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}

# Include the component configuration, which has settings that are common for the component across all environments
include "envcommon" {
  path = "${dirname(find_in_parent_folders())}/_envcommon/landingzone/github-actions-openid-connect-provider.hcl"
}
```

</details>


#### Create the OIDC resources

Make sure you have administrator access to your account available, then run the following commands to deploy the infrastructure for the OIDC resources we created in the previous steps. Repeat this step for each account you would like to manage with Pipelines.


  ```bash
  cd $$AWS_ACCOUNT_NAME$$
  terragrunt run-all plan
  ```

Review the plan output and if it looks good, apply the changes.


  ```bash
  terragrunt run-all apply
  ```

#### Commit and push the changes

Create a branch, and commit all your changes with a **`[skip ci]`** text included in the commit message to avoid triggering the Pipelines workflow. Push the changes to the repository, create a Pull Request, and merge the changes to the <CustomizableValue id="DEPLOY_BRANCH_NAME" /> branch you specified in the `.github/workflows/pipelines.yml` file.


## Enable GitHub Authentication for Pipelines

Follow the instructions in [Authenticating via GitHub App](/2.0/docs/pipelines/installation/viagithubapp) to enable GitHub authentication for Pipelines in your repository using the Gruntwork.io GitHub App. This is the recommended way to authenticate Pipelines with GitHub in your repository but you may also [Authenticate via Machine Users](/2.0/docs/pipelines/installation/viamachineusers) if you prefer.

## Next Steps

You have successfully completed the installation for Gruntwork Pipelines in your existing repository. Follow [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change) tutorial to test the installation and deploy your first infrastructure using Gruntwork Pipelines.

