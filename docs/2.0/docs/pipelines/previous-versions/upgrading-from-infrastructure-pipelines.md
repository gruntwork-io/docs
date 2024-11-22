# Upgrading from `infrastructure-pipelines`

This migration guide is intended for those running the previous version of Gruntwork Pipelines, referred to as `infrastructure-pipelines`, who want to upgrade to the latest version of Gruntwork Pipelines. We will refer to the latest version of Gruntwork Pipelines simply as "Pipelines" in the rest of this document.

## What's New

To get an idea of what makes the most recent version of Pipelines different from the previous version, we recommend reading the [deprecation notice](/infrastructure-pipelines/overview/deprecation.md). This notice provides a high-level overview of the changes and improvements made in the latest version of Pipelines.

## Prerequisites

Before you begin the migration process, ensure that you have the following prerequisites:

- [mise](https://mise.jdx.dev/) installed.
- AWS Administrator (or similar) permissions in all AWS accounts managed by your `infrastructure-live` repository.
- A solid understanding of Infrastructure as Code (IAC) fundamentals, or support from Gruntwork.

## Step 1: Ensure Machine Users are configured

Make sure that you have the appropriate tokens and secrets configured to allow your workflows to access the necessary secrets to interact with your infrastructure.

For information on how to do this, visit the instructions in [Machine Users](/infrastructure-pipelines/security/machine-users.md).


## Step 2: Update the `bootstrap.yml` workflow

Copy the [bootstrap.yml](https://github.com/gruntwork-io/infrastructure-live-root-template/blob/main/.github/workflows/bootstrap.yml) workflow, and place it in the `.github/workflows` directory of your `infrastructure-live` repository (if you already have a workflow file here, you can overwrite it).

:::tip
Use the [README](https://github.com/gruntwork-io/infrastructure-live-root-template/tree/main?tab=readme-ov-file#infrastructure-live-root-template) to understand what the workflow does and the required inputs for running it.

Be extra careful to ensure that you have replaced all instances of `<REPLACE>` in the `bootstrap.yml` workflow file!
:::


## Step 3: Run the `bootstrap.yml` workflow

Find the workflow labeled `Infrastructure Live Root Bootstrap` in the `Actions` tab of your repository.

Run the workflow by clicking the green `Run workflow` button, providing the necessary inputs as described in the [Workflow Inputs section](https://github.com/gruntwork-io/infrastructure-live-root-template/tree/main?tab=readme-ov-file#workflow-inputs) (you can find a lot of those values in your `accounts.yml` file).

You will now have a new branch in your repository named `bootstrap-repository` and a pull request to merge it into the default branch of your repository.

:::caution
Make sure you do not proceed with the merge, as you will need to modify your pull request to avoid conflicts with your existing codebase.
:::

You will definitely need to make at least _some_ adjustments to the pull request. Access the `bootstrap-repository` branch and make the necessary changes to the pull request to ensure that it is compatible with your existing codebase.

```bash
git clone <your-repo-url>
cd <your-repo-name>
git checkout bootstrap-repository
```

The following will explain each of the major changes that are presented to you in this pull request, and how to handle them as desired for your repository.

If you find that any changes that are not listed here that you are concerned about, or if you find the instructions on how to handle them unclear, please do not hesitate to reach out to Gruntwork support at [support@gruntwork.io](mailto:support@gruntwork.io).

### Reverting the update of your `accounts.yml` file

The `bootstrap.yml` workflow sets your `accounts.yml` file as if you were setting up a new repository from scratch. You have likely already made changes to this file, and you will want to revert the changes that the `bootstrap.yml` workflow made to this file:

```bash
git checkout origin/main -- accounts.yml
```

### Reverting the update of your `multi_region_common.hcl` file

The `bootstrap.yml` workflow sets your `multi_region_common.hcl` file as if you were setting up a new repository from scratch. You have likely already made changes to this file, and you will want to revert the changes that the `bootstrap.yml` workflow made to this file:

```bash
git checkout origin/main -- multi_region_common.hcl
```

### Adding `.mise.toml`

In order to synchronize the versions of tools that you use locally with the versions of tools that Pipelines uses, Pipelines now leverages the open source tool, [mise](https://mise.jdx.dev/). Mise allows you to specify the versions of tools you use in a `.mise.toml` file, which Pipelines will use to ensure that the versions of tools you use locally match the versions of tools that Pipelines uses.

In your pull request, you will find a `.mise.toml` file that looks like the following:

```toml
[tools]
opentofu = "1.6.2"
terragrunt = "0.57.12"
awscli = "latest"
```

If you are not happy with the tools or the versions that are specified in this file, you can modify them as you see fit. For example, if you would like to pin the version of the AWS CLI to a particular version, you can do so like this:

```toml
[tools]
opentofu = "1.6.2"
terragrunt = "0.57.12"
awscli = "2.15.44"
```

:::info
If you have not made the switch over to OpenTofu yet, you can simply set your current version of `terraform` in the `.mise.toml` file.
:::

Run the following in order to install the dependencies locally:

```bash
mise install
```

You and your colleagues will now be using this file to synchronize the versions of tools you use locally, and the versions of tools that Pipelines uses.

### The `.github/workflows/account-factory.yml` workflow

If you are familiar with a `account-factory.yml` workflow that leverages a GitHub Actions form with multiple necessary inputs, you will notice a change in that the workflow now expects a JSON input string to configure the account request.

This has been adjusted to leverage a more flexible, and repeatable approach to generating account requests.

A sample form has been added as part of this initial pull request, and you can find it in the `.github/workflows/account-factory-inputs.html` file. You can modify this form as necessary to meet your needs so that account requests can be made in a way that is consistent with your organization's needs.

A common pattern seen here is to either use an external ticketing system like JIRA to collect the necessary information, and use an integration with the GitHub API to automatically submit the account request pull request once it has been reviewed in the ticketing system, or to simply generate the JSON input string to be passed into the GitHub Actions workflow.

### The `state_bucket_pattern` value in `account.hcl`

Previously, the `account.hcl` file had a `state_bucket_name` value that was used to specify the name of the S3 bucket that would be used to store the state of resources in that account. This value has been replaced with a `state_bucket_pattern` value so that roles interacting with S3 state can access a different state bucket per region if necessary, as a mechanism for fault tolerance and data isolation in a particular region.

### Adding missing `root-pipelines-plan` and `root-pipelines-apply` roles

You might need to copy over the `github-actions-openid-connect-provider`, `root-pipelines-plan` and `root-pipelines-apply` folders from another account (like the `security` account) to all of your other accounts, depending on what your current account structure looks like.

These roles are what Pipelines uses to plan and apply changes to your infrastructure. They must be present in any account that pipelines is going to operate in from the `infrastructure-live-root` repository.

Given the chicken and egg issue that arises from needing the roles present to use the roles, you will need to apply these changes manually:

:::warning
Never make changes to Identity and Access Management (IAM) resources without carefully reviewing and understanding the changes that are being made.

Make sure you understand the permissions being assigned to these roles before applying them, and ensure that they are appropriate for your organization.
:::

```bash
# With permissions for the account you are working in
cd <path-to-account>/_global/github-actions-openid-connect-provider
# If this resource already exists, in your account, but you do not have the OIDC provider in state, you can import it
# Note: If you do not have `jq` installed, you can simply replace the code in `$()` below with the relevant account ID.
terragrunt import 'aws_iam_openid_connect_provider.github' "arn:aws:iam::$(aws sts get-caller-identity | jq -r '.Account'):oidc-provider/token.actions.githubusercontent.com"
terragrunt apply
# Note that if you did need to import this resource, you will need to remove it from state if defined in IAC elsewhere to avoid a potential error later.
# One place where it was previously defined was in the `github-oidc-role` folder.
# e.g.
cd ../github-oidc-role
terragrunt state rm 'aws_iam_openid_connect_provider.github[0]'
# You can now run an apply to ensure that your `root-pipelines-plan` and `root-pipelines-apply` roles are present in the account
cd ../root-pipelines-plan
terragrunt apply
cd ../root-pipelines-apply
terragrunt apply
```

You will need to repeat this process for every existing account in your repository, as all accounts need to have these roles present in order for Pipelines to operate in them.

Going forward, the account baseline process will ensure that the necessary roles are present in all accounts before Pipelines attempts to use them.

### The `pipelines.yml` workflow

The `pipelines.yml` workflow is the main workflow that Pipelines uses to plan and apply changes to your infrastructure. Previously, you may have had a workflow file that was significantly more complicated, and interacted with a secondary `infrastructure-pipelines` repository. The adjustments made to this workflow is the main reason for this migration guide, so it is important to understand the changes that have been made here.

The logic that was previously done by creating a workflow dispatch to a secondary `infrastructure-pipelines` repository has been moved to a shared workflow in the Gruntwork managed [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository. This shared workflow is used by default by any repository that is using Pipelines.

`infrastructure-live` repositories that reference this shared workflow will now run with their own context (the secrets and role assumptions are specific to the `infrastructure-live` repository that is running the workflow), and maintenance of a secondary repository is no longer necessary.

This change is designed to make it easier to manage infrastructure at scale, and has myriad advantages over the previous approach. To learn more about this change, read the [deprecation notice here](/infrastructure-pipelines/overview/deprecation.md).

Please make sure you understand the changes here, and if you have any questions, please reach out to Gruntwork support.

### The `.gitignore` file

Previously, you may have had a `.gitignore` file that ignored the `.terraform.lock.hcl` file. This entry was present to simplify the lives of our customers, as the `.terraform.lock.hcl` file can result in confusing error messages when it is committed to a repository that runs on multiple platforms (e.g. MacOS on local workstations and Linux in CI/CD).

We have removed this entry and added documentation to the `.gitignore` file to explain why this file is not ignored, and documentation on how to ensure that this file does not cause issues in your workflows.

Please also ensure that this is the only change that has occurred in your `.gitignore` file. If you have made custom adjustments, they may need to be reproduced now.

### The `.gruntwork/config.yml` file

The `config.yml` file in the `.gruntwork` directory has expanded in responsibility from earlier versions of Pipelines. The file now includes multiple different configurations that are used by Pipelines to dynamically alter the behavior of the workflows that are run.

By moving these configurations into a central configuration file with improved documentation, the goal is to make it clearer to understand how and why Pipelines is using particular versions of templates, etc.

Note that the Pipelines CLI, Terragrunt and OpenTofu/Terraform versions are no longer specified in this file. Instead, they are specified in the `.mise.toml` file, and the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository. This adjustment was made to maximize parity between the versions of tools that you use locally, that your colleagues use on their workstations and the versions of tools that Pipelines uses.

### OpenTofu by default

Gruntwork Pipelines now uses OpenTofu by default.  If you wish to use the Terraform binary instead, there is a `tf-binary` configuration value in `.gruntwork/config.yml` that you can update to specify what pipelines will use.

### The `tags.yml` file

Depending on when you configured your `infrastructure-live` repository, you may not have had a `tags.yml` file at the root of your repository and the root of each folder representing each account in your repository.

These files are used as part of a system for ensuring that every resource provisioned via IAC is tagged with the appropriate tags for your organization. This is a critical best practice for cloud infrastructure, and is vital in ensuring a strong cost optimization and security posture (when used in a context leveraging [Attribute Based Access Control](https://en.wikipedia.org/wiki/Attribute-based_access_control)).

For more information on how these files are used, read the `Tagging` section of the updated `README.md` in the pull request that was generated by the `bootstrap.yml` workflow.

### Removal of `source_base_url` from `terragrunt.hcl` files

Previous versions of `infrastructure-live` repositories may have a `source_base_url` local variable used as part of their `terraform` `source` values in `terragrunt.hcl` files. This is a pattern that was used to ensure that all modules were sourced from a single location.

Unfortunately, this pattern has fallen out of favor due to the complexities that it introduces when trying to ensure that there is configuration isolation in each account. Customers have found it easier to manage gradual roll outs of module versions when every `terragrunt.hcl` file is self-contained from a `terraform` configuration block perspective.

If you have a `source_base_url` local variable in your `terragrunt.hcl` files, you will need to remove it and update the `source` values in your `terraform` configuration blocks to reflect the underlying module source. You can do this by searching for `source_base_url` in your editor, taking note of every location where this pattern is used, then finding the referenced include (usually the equivalent `_envcommon` folder for the folder you are looking at), and updating the `source` value to reflect the new location.

### The `README.md` file

The `README.md` file has been updated to provide additional information that is relevant to the changes that have been made in this pull request, and to provide more overall context to the repository.

Please review the changes to this file to ensure that it adequately explains how the repository is structured, and how it is intended to be used.

## Step 4: Merge the pull request

Once you have made the necessary changes to the pull request, and you are confident that the changes are compatible with your existing codebase, you can merge the pull request.

Ensure that the commit message in the pull request includes the text `[skip ci]`. This will prevent Pipelines from running, and you don't really need it to run at this stage.

:::tip
If at any time you would like to revert these changes, you can do so by loading the merged pull request in your browser and clicking the `Revert` button. This will generate a corresponding revert pull request. Just make sure you include that same `[skip ci]` text in the commit message when merging it to avoid any unintended infrastructure changes.
:::

## Step 5: Cleanup

You should now have a working modern Pipelines setup in your `infrastructure-live` repository. Before considering the migration process complete, you should engage in some cleanup to make sure that you are not leaving any unnecessary resources behind.

:::tip
If you would like to make sure that you can quickly revert back to the `infrastructure-pipelines` setup, feel free to skip this step for now, then revisit once you are confident that the new setup is working as expected.
:::

### Remove unnecessary files

Depending on the current structure of your `infrastructure-live` repository, you may have additional folders that are no longer necessary. Feel free to clean out those folders as necessary. Now that you have a working modern Pipelines setup, you can use it to drive the cleanup process.

Some files that you should remove include:

- `_envcommon/landingzone/pipelines-pre-auth-role.hcl`
- `_envcommon/landingzone/central-pipelines-plan-role.hcl`
- `_envcommon/landingzone/central-pipelines-apply-role.hcl`
- `_envcommon/landingzone/team-pipelines-plan-role.hcl`
- `_envcommon/landingzone/team-pipelines-apply-role.hcl`
- `_envcommon/landingzone/pipelines-policy-plan-update-role.hcl`
- `_envcommon/landingzone/pipelines-policy-apply-update-role.hcl`
- `_envcommon/landingzone/github-oidc-role.hcl`

Some folders that you should search across your repository for removal include:

- `pipelines-pre-auth-role`
- `team-pipelines-plan-role`
- `team-pipelines-apply-role`
- `pipelines-pre-auth-role`
- `central-pipelines-plan-role`
- `central-pipelines-apply-role`
- `pipelines-policy-plan-update-role`
- `pipelines-policy-apply-update-role`
- `github-oidc-role`

It is very likely that you will not have _all_ of these files in your `infrastructure-live` repository, but you should search for them to ensure that you are not leaving any unnecessary files in your repository.

If you have any residual files that you are not sure about, please reach out to Gruntwork support for assistance.

### Delete Old Tokens and Secrets

Now that you have a working modern Pipelines setup, you can delete any old tokens that were used to interact with the `infrastructure-pipelines` repository. This will ensure that you are not leaving any unnecessary tokens lying around that could be used to interact with your infrastructure.

You can see a list of tokens and secrets that are created as part of the `infrastructure-pipelines` version of Pipelines [here](/infrastructure-pipelines/security/machine-users.md). These tokens and secrets have been renamed in the latest version of Pipelines, and as a consequence, you can safely delete the old tokens and secrets after you've created the new ones.

### Archive the `infrastructure-pipelines` repository

You no longer need your `infrastructure-pipelines` repository, and you can archive it to ensure that you are not accidentally using it in the future. Once you've deleted all of the roles, tokens and secrets in the previous sections, this repository will not have any access to your infrastructure, but it's a good practice not to leave behind any unnecessary resources.

Follow [GitHub documentation on archiving the repository](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories). Note that this is a reversible process, which is advisable in case you need to revert back to the old setup for any reason. If you would prefer to permanently delete the repository instead, you can refer to the [GitHub documentation on deleting the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository).

## Conclusion :tada:

You have successfully migrated your repository from `infrastructure-pipelines`!

We hope this migration has been smooth for you, and excited for you to experience all the benefits this migration brings.

Now that you have fully migrated your repository, we recommend carrying out some small tests to make sure that you are both confident of the stability of your repository, and that you are comfortable with making changes to it.

Create a new pull request that makes a small change to your infrastructure code (adding a comment to a `terragrunt.hcl` file should trigger Pipelines), and ensure that the plan and apply workflows run as expected, that you know where the logs will appear, and that you have a good understanding of how to troubleshoot any issues that may arise.

Also, if you encountered any road bumps that might be smoothed over for the next customer reading this guide, please consider opening an issue or creating a pull request to improve this guide for the community!

If you have any questions, or if you have encountered any issues during this migration, please do not hesitate to reach out to Gruntwork support at [support@gruntwork.io](mailto:support@gruntwork.io).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "536162a4ee40d5213f60efc28690c741"
}
##DOCS-SOURCER-END -->
