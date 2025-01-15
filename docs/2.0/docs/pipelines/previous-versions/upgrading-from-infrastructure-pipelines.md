# Upgrading from `infrastructure-pipelines`

This migration guide is for those using the earlier version of Gruntwork Pipelines, referred to as `infrastructure-pipelines`, and seeking to upgrade to the latest version of Gruntwork Pipelines. The latest version is referred to simply as "Pipelines" throughout this document.

## What's new

For a detailed overview of changes and improvements in the latest version of Pipelines, refer to the [deprecation notice](/infrastructure-pipelines/overview/deprecation.md).

## Prerequisites

Before starting the migration process, ensure the following:

- [mise](https://mise.jdx.dev/) is installed.
- AWS Administrator permissions (or equivalent) for all AWS accounts managed by your `infrastructure-live` repository.
- A good understanding of Infrastructure as Code (IAC) or access to Gruntwork support.

## Step 1: Ensure Machine Users are configured

Verify that appropriate tokens and secrets are configured to allow workflows to access the necessary infrastructure secrets. Detailed instructions can be found in the [Machine Users guide](/infrastructure-pipelines/security/machine-users.md).

## Step 2: Update the `bootstrap.yml` workflow

Copy the [bootstrap.yml](https://github.com/gruntwork-io/infrastructure-live-root-template/blob/main/.github/workflows/bootstrap.yml) file to the `.github/workflows` directory of your `infrastructure-live` repository. Overwrite any existing workflow file if necessary.

:::tip
Review the [README](https://github.com/gruntwork-io/infrastructure-live-root-template/tree/main?tab=readme-ov-file#infrastructure-live-root-template) for an explanation of the workflow and required inputs. Ensure all `<REPLACE>` placeholders in the `bootstrap.yml` file are updated correctly.
:::

## Step 3: Run the `bootstrap.yml` workflow

Navigate to the `Actions` tab of your repository and locate the workflow labeled `Infrastructure Live Root Bootstrap`. Click the green `Run workflow` button, providing the necessary inputs as described in the [Workflow Inputs section](https://github.com/gruntwork-io/infrastructure-live-root-template/tree/main?tab=readme-ov-file#workflow-inputs). Many inputs can be sourced from your `accounts.yml` file.

After execution, a new branch named `bootstrap-repository` and a corresponding pull request (PR) will be created in your repository.

:::caution
Do not merge the PR immediately. Modify it as necessary to prevent conflicts with your existing codebase.
:::

### Modify the pull request

Access the `bootstrap-repository` branch, make the required changes to the PR, and ensure compatibility with your existing codebase.

```bash
git clone <your-repo-url>
cd <your-repo-name>
git checkout bootstrap-repository
```

The following sections outline the major changes introduced in this pull request and provide guidance on how to handle them appropriately for your repository.

If you encounter changes not covered here, or if any instructions are unclear, please contact Gruntwork support at [support@gruntwork.io](mailto:support@gruntwork.io) for assistance.

### Reverting changes to your `accounts.yml`file

The `bootstrap.yml` workflow configures the `accounts.yml` file as if initializing a new repository. If you have previously customized this file, you will need to revert the changes made by the `bootstrap.yml` workflow to retain your existing configuration:

```bash
git checkout origin/main -- accounts.yml
```

### Reverting the update of your `multi_region_common.hcl`file

The `bootstrap.yml` workflow sets your `multi_region_common.hcl` file as if you were setting up a new repository from scratch. You have likely already made changes to this file, and you will want to revert the changes that the `bootstrap.yml` workflow made to this file:

```bash
git checkout origin/main -- multi_region_common.hcl
```

### Adding `.mise.toml`

To synchronize the versions of tools used locally with those used by Pipelines, Pipelines now integrates with the open-source tool [mise](https://mise.jdx.dev/). Mise enables you to define tool versions in a `.mise.toml` file, ensuring consistency between local environments and Pipelines.

The pull request includes a `.mise.toml` file that resembles the following:

```toml
[tools]
opentofu = "1.6.2"
terragrunt = "0.57.12"
awscli = "latest"
```

If the tools or versions specified in this file do not meet your requirements, you can modify them as needed. For instance, to pin the AWS CLI to a specific version, you can update the file as follows:

```toml
[tools]
opentofu = "1.6.2"
terragrunt = "0.57.12"
awscli = "2.15.44"
```

:::info
If you have not transitioned to OpenTofu yet, you can specify your current version of `terraform` in the `.mise.toml` file.
:::

To install the dependencies locally, execute the following command:

```bash
mise install
```

You and your colleagues will now use this file to ensure synchronization between the versions of tools used locally and the versions used by Pipelines.

### The `.github/workflows/account-factory.yml` workflow

If you are accustomed to an `account-factory.yml` workflow that uses a GitHub Actions form with multiple required inputs, note that this workflow now expects a JSON input string to configure the account request. 

This adjustment enhances flexibility and repeatability when generating account requests.

A sample form is included in this initial pull request and can be found in the `.github/workflows/account-factory-inputs.html` file. You can modify the form as needed to align with your organization's requirements for account requests.

A common practice is to integrate an external ticketing system, such as JIRA, to collect the necessary information. This system can integrate with the GitHub API to automatically submit account request pull requests after review, or you can generate the JSON input string manually for use in the GitHub Actions workflow.

### The `state_bucket_pattern` value in `account.hcl`

The `account.hcl` file previously included a `state_bucket_name` value to define the S3 bucket used for storing the state of resources in that account. This has been replaced by a `state_bucket_pattern` value, allowing roles interacting with S3 state to access a different state bucket per region. This change improves fault tolerance and facilitates data isolation by region.

### Adding missing `root-pipelines-plan` and `root-pipelines-apply` roles

You may need to copy the `github-actions-openid-connect-provider`, `root-pipelines-plan`, and `root-pipelines-apply` folders from another account (such as the `security` account) to all accounts, depending on your current account structure.

These roles are required for Pipelines to plan and apply changes to your infrastructure. They must be present in every account that Pipelines interacts with via the `infrastructure-live-root` repository.

Due to the chicken-and-egg issue of needing roles present before they can be used, you must apply these changes manually:

:::warning
Never modify Identity and Access Management (IAM) resources without thoroughly reviewing and understanding the changes being made.

Ensure that the permissions assigned to these roles are appropriate for your organization before applying them.
:::

```bash
# # Ensure you have the necessary permissions for the account you are working in
cd <path-to-account>/_global/github-actions-openid-connect-provider

# If the OIDC provider already exists in your account but is not in the state file, you can import it
# Note: If `jq` is not installed, replace the code in `$()` below with the relevant account ID.
terragrunt import 'aws_iam_openid_connect_provider.github' "arn:aws:iam::$(aws sts get-caller-identity | jq -r '.Account'):oidc-provider/token.actions.githubusercontent.com"
terragrunt apply

# If you had to import this resource, you must remove it from the state file if it is defined elsewhere in your IaC setup to prevent potential errors later.
# For example, it may have previously been defined in the `github-oidc-role` folder:
cd ../github-oidc-role
terragrunt state rm 'aws_iam_openid_connect_provider.github[0]'

# Apply the changes to ensure that the `root-pipelines-plan` and `root-pipelines-apply` roles are present in the account
cd ../root-pipelines-plan
terragrunt apply
cd ../root-pipelines-apply
terragrunt apply
```

You must repeat this process for every existing account in your repository to ensure these roles are present. All accounts must have these roles for Pipelines to function properly.

Moving forward, the account baseline process will automatically ensure that these necessary roles are included in all accounts before Pipelines attempts to operate in them.

### The `pipelines.yml` workflow

The `pipelines.yml` workflow serves as the primary workflow for planning and applying changes to your infrastructure. Previously, workflows were often more complex and relied on interactions with a secondary `infrastructure-pipelines` repository. This migration guide addresses these changes and introduces a simplified approach.

The logic previously managed by dispatching workflows to a secondary `infrastructure-pipelines` repository has been replaced with a shared workflow located in the Gruntwork-managed [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository. By default, any repository using Pipelines will reference this shared workflow.

Repositories using `infrastructure-live` now operate within their own context. Secrets and role assumptions are specific to the repository executing the workflow, eliminating the need for a secondary repository. This adjustment simplifies infrastructure management at scale and offers numerous benefits over the previous method. To learn more, see the [deprecation notice here](/infrastructure-pipelines/overview/deprecation.md).

Please ensure you understand these changes. For questions, contact Gruntwork support.

### The `.gitignore` file

Previously, `.terraform.lock.hcl` was included in the `.gitignore` file to reduce confusion caused by platform-specific errors (e.g., between MacOS and Linux). However, this entry has been removed to align with best practices. Documentation has been added to the `.gitignore` file to explain the reasoning and how to prevent issues in your workflows.

Ensure that no other unintended changes have occurred in your `.gitignore` file. Reproduce custom adjustments if necessary.

### The `.gruntwork/config.yml` file

The `.gruntwork/config.yml` file has expanded responsibilities. It now includes multiple configurations dynamically altering Pipelines workflows. 

Notably, Pipelines CLI, Terragrunt, and OpenTofu/Terraform versions are no longer specified here but instead in the `.mise.toml` file and the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository. This approach ensures consistent tool versions across local environments, workstations, and Pipelines.

### OpenTofu by default

Gruntwork Pipelines now defaults to OpenTofu. If you wish to continue using the Terraform binary, you can configure the `tf-binary` value in `.gruntwork/config.yml` to specify your preference.

### The `tags.yml` file

Depending on when your `infrastructure-live` repository was configured, `tags.yml` files may not exist at the root of your repository or account-specific folders. These files are essential for ensuring all resources provisioned via IaC are tagged appropriately. Proper tagging is a critical best practice for cloud infrastructure, aiding cost optimization and security (e.g., when using [Attribute-Based Access Control](https://en.wikipedia.org/wiki/Attribute-based_access_control)).

Refer to the `Tagging` section in the updated `README.md` included in the pull request generated by the `bootstrap.yml` workflow for more information.

### Removal of `source_base_url` from `terragrunt.hcl` files

Earlier versions of `infrastructure-live` repositories often used a `source_base_url` local variable in `terragrunt.hcl` files to centralize module sourcing. This pattern has been deprecated due to its complexity and the difficulty of managing configuration isolation.

To update, search for `source_base_url` in your files. Replace its usage with direct module source paths, referencing the relevant `_envcommon` folder if necessary.

### The `README.md` file

The `README.md` file has been updated to provide additional context about the repository structure and usage. Review the changes to ensure it adequately explains how the repository is organized and its intended use.

## Step 4: Merge the pull request

Once you've made the required changes to the pull request and verified compatibility with your existing codebase, merge the pull request.

Include `[skip ci]` in the commit message to prevent Pipelines from running unnecessary workflows.

:::tip
If you need to revert these changes later, open the merged pull request in your browser, click the `Revert` button, and create a revert pull request. Be sure to include `[skip ci]` in the commit message for the revert as well.
:::

## Step 5: Cleanup

With the migration complete, you should clean up unnecessary resources to streamline your repository and reduce clutter.

:::tip
If you're uncertain about the new setup and want a fallback option, you can defer cleanup until you're confident everything is functioning as expected.
:::

### Remove unnecessary files

Search for and remove outdated files or folders that are no longer needed, such as:

- `_envcommon/landingzone/pipelines-pre-auth-role.hcl`
- `_envcommon/landingzone/central-pipelines-plan-role.hcl`
- `_envcommon/landingzone/central-pipelines-apply-role.hcl`

Consult Gruntwork support if you're unsure about residual files.

### Delete old tokens and secrets

Remove any tokens or secrets used with the previous `infrastructure-pipelines` setup. For a list of old tokens, refer to [Machine Users Documentation](/infrastructure-pipelines/security/machine-users.md).

### Archive the `infrastructure-pipelines` repository

If the `infrastructure-pipelines` repository is no longer needed, archive it to prevent accidental use. Refer to [GitHub's archiving documentation](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories).

## Conclusion 🎉

You have successfully migrated your repository from `infrastructure-pipelines`! Perform small tests to ensure stability and familiarize yourself with the new setup.

If you encounter any issues or have suggestions for improving this guide, please contact Gruntwork support or contribute to the community guide.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "536162a4ee40d5213f60efc28690c741"
}
##DOCS-SOURCER-END -->
