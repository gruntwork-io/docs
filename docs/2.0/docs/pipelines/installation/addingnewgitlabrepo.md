# Initial Setup

To configure Gruntwork Pipelines in a **new** GitLab repository, complete the following steps:

:::info
To use Gruntwork Pipelines in an **existing** GitLab repository, see this [guide](/2.0/docs/pipelines/installation/addinggitlabrepo).
:::

https://github.com/gruntwork-io/terraform-aws-architecture-catalog/tree/main/templates/devops-foundations-infrastructure-live-root

1. Create a new GitLab project for your `infrastructure-live-root` repository.
1. Install Boilerplate; a CLI tool for generating files from templates.
1. Configure the variables required to run the infrastructure-live-root boilerplate template.
1. Create your `infrastructure-live-root` repository contents using Gruntwork's architecture-catalog template.
1. Apply the account baselines to your AWS accounts.

## Create a new infrastructure-live-root GitLab project

1. Navigate to the GitLab group you want to create the project in.
1. Click the **New Project** button.
1. Enter a name for the project. e.g. infrastructure-live-root
1. Click **Create Project**.
1. Clone the project to your local machine.
1. Navigate to the project directory.

## Install Boilerplate

If you have already [mise](https://mise.jdx.dev/getting-started.html) installed on your machine, you can simply run `mise use boilerplate`, alternatively you can download it from the [release page](https://github.com/gruntwork-io/boilerplate/releases/).


## Configure the variables required to run the boilerplate template

Copy the following variables to a `vars.yaml` file in the root of your project and update the `<REPLACE>` values with your own.

```yaml title="vars.yaml"
SCMProvider: GitLab

# The GitLab group to use for the infrastructure repositories. This should include any additional sub-groups in the name
# Example: acme/prod
SCMProviderGroup: <REPLACE>

# The GitLab project to use for the infrastructure-live repository.
SCMProviderRepo: infrastructure-live-root

# The name of the branch to deploy to.
DeployBranchName: main

# The AWS account ID for the management account
# Example: "123456789012"
AwsManagementAccountId: <REPLACE>

# The AWS account ID for the security account
# Example: "123456789013"
AwsSecurityAccountId: <REPLACE>

# The AWS account ID for the logs account
# Example: "123456789014"
AwsLogsAccountId: <REPLACE>

# The AWS account ID for the shared account
# Example: "123456789015"
AwsSharedAccountId: <REPLACE>

# The AWS account Email for the logs account
# Example: logs@acme.com
AwsLogsAccountEmail: <REPLACE>

# The AWS account Email for the management account
# Example: management@acme.com
AwsManagementAccountEmail: <REPLACE>

# The AWS account Email for the security account
# Example: security@acme.com
AwsSecurityAccountEmail: <REPLACE>

# The AWS account Email for the shared account
# Example: shared@acme.com
AwsSharedAccountEmail: <REPLACE>

# The name prefix to use for creating resources e.g S3 bucket for OpenTofu state files
# Example: acme
OrgNamePrefix: <REPLACE>

# The default region for AWS Resources
# Example: us-east-1
DefaultRegion: <REPLACE>

################################################################################
# OPTIONAL VARIABLES WITH THEIR DEFAULT VALUES. UNCOMMENT AND MODIFY IF NEEDED.
################################################################################

# List of the git repositories to populate for the catalog
# CatalogRepositories:
#   - github.com/gruntwork-io/terraform-aws-service-catalog

# The AWS partition to use.
# AWSPartition: aws

# The name of the IAM role to use for the plan job.
# PlanIAMRoleName: root-pipelines-plan

# The name of the IAM role to use for the apply job.
# ApplyIAMRoleName: root-pipelines-apply

# The default tags to apply to all resources.
# DefaultTags:
#   "{{ .OrgNamePrefix }}:Team": "DevOps"

# The version for terraform-aws-security module to use for OIDC provider and roles provisioning
# SecurityModulesVersion: v0.75.18

# The URL of the custom SCM provider instance. Set this if you are using a custom instance of GitLab or GitHub.
# CustomSCMProviderInstanceURL: https://gitlab.example.io

# The relative path from the host server to the custom pipelines workflow repository. Set this if you are using a custom/forked instance of the pipelines workflow.
# CustomWorkflowHostRelativePath: pipelines-workflows
```

## Creating the infrastructure-live-root repository

Gruntwork provides a boilerplate [template](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/tree/main/templates/devops-foundations-infrastructure-live-root) that incorporates best practices while allowing for customization. The template is designed to scaffold a best-practices Terragrunt configurations. It includes patterns for module defaults, global variables, and account baselines. Additionally, it integrates Gruntwork Pipelines

Run the following command, from the root of your project, to generate the `infrastructure-live-root` repository contents:

<!-- TODO: Update template version before merging -->
```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/devops-foundations-infrastructure-live-root/?ref=ore/dev-1024-extend-account-factory-templates-for-gitlab" --output-folder . --var-file vars.yaml --non-interactive
```

## Apply the account baselines to your AWS accounts

<!-- TODO: Best way to port/reuse this information: https://github.com/gruntwork-io/infrastructure-live-root-template/blob/main/.github/workflows/templates/infra-root-pr/infra-root-pr.md -->

