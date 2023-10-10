# Upgrading from the ECS Deploy Runner

This migration guide is intended for those running the previous version of Gruntwork Pipelines, known as "ECS Deploy Runner" (EDR), who want to upgrade to the latest version of Gruntwork Pipelines. We will refer to the latest version of Gruntwork Pipelines simply as "Pipelines" in the rest of this document.

To accomplish this task, we'll be using ECS Deploy Runner to deploy Pipelines, then using Pipelines to destroy ECS Deploy Runner.

## What's new

ECS Deploy Runner was designed as a highly secure approach to CI/CD for infrastructure. With Pipelines, we adapted the security principles built into ECS Deploy Runner to embrace modern CI system functionality, leaning heavily on GitHub Actions native functionality to create a more streamlined setup experience, and better overall UX. The major changes in Pipelines include:

- **Easier setup.** There are no resources to deploy in AWS (other than granting an OIDC token), and setting up Pipelines amounts to configuring a few GitHub Actions workflows.
- **Pull-request centric UX.** Pipelines organizes the user experience around the pull request, adding rich indicationg of everything that occurred directly in the pull request comments.
- **Streamlined updates.** Pipelines has been designed to make getting the latest version published by Gruntwork an easy experience.

## Prerequisites

- [Boilerplate](https://github.com/gruntwork-io/boilerplate#install) installed on your system (requires Gruntwork subscription)
- Ability to create repositories in your GitHub Organization
- Ability to add users to your GitHub Organization and the Gruntwork Developer Portal
- Permissions to create secrets in GitHub repositories

## GitHub Personal Access Token Setup

Pipelines uses several GitHub Personal Access Tokens (PATs) across workflows, with each PAT possessing only the minimal set of permissions necessary for its specific task. To uphold the principle of least privilege for each PAT, we advise maintaining two distinct users: the pre-existing CI user and a new CI Read Only user. The CI Read Only user should have access to read your `infrastructure-live` repository, `infrastructure-modules` repository (if applicable), and the Gruntwork Library.

### Create a CI Read Only User

Follow the steps on [signing up a new GitHub account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) to create a new user. If you have an email address for your existing CI user, we recommend using plus addressing, such as `ci+read-only@your-domain.com`, as the email address for the new account.

Add the new user to your GitHub org, adding it to a Team with read only access to your `infrastructure-live` and `infrastructure-modules` repository (if applicable). Follow the steps on [adding a user to the Gruntwork Developer portal](../../developer-portal/invite-team.md) to grant the CI Read Only user access to the Gruntwork Library.

### Create GitHub Personal Access Tokens for GitHub Actions Workflows

Next, create the following PATs for the new CI Read Only user. We'll use these tokens shortly.

- `GRUNTWORK_CODE_ACCESS_TOKEN`: Classic token with READ access to repos. This should should be associated with the `CI Read Only` user created in [creating a CI Read only user](#creating-a-ci-read-only-user).
- `PIPELINES_DISPATCH_TOKEN`: Fine-grained token that only has workflow permissions to execute workflows in the `infrastructure-pipelines` repository. This token should be associated with your existing CI user.
- `INFRA_LIVE_ACCESS_TOKEN`: Fine-grained token with READ and WRITE access to your `infrastructure-live` repository. This token should be associated with your existing CI user.

## Create your infrastructure-pipelines repository

Pipelines separates code (IaC) and deployment using two different git repositories. One repository holds both the deployment code and the AWS account access, and assigns write privileges only to a select group of admins. This repository uses OpenID Connect and AWS IAM roles to generate temporary session credentials, avoiding the need to store long-lasting secrets.

We strongly recommend naming this repository `infrastructure-pipelines`. All code generated assumes the repository will be located at `<your GitHub Organization>/infrastructure-pipelines`, so using a different name will require manual work on your behalf.

### Create the repo

Navigate to the repositories tab of your organization or personal GitHub account in your web browser.

1. Click the **New Repository** button.
1. In the **Repository name** field enter `infrastructure-pipelines`
1. Select the **Private** option
1. Do not initialize the repo with a README, gitignore, or license

:::info
For a simple proof of concept, the default repo configuration will suffice. Before using this repository in a production environment, we recommend setting up a [branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) for your `main` branch. At a minimum, we recommend enabling requiring a pull request before merging with at least one reviewer required.
:::

### Use boilerplate to generate code

Next, generate the `infrastructure-pipelines` repository code using [Boilerplate](https://github.com/gruntwork-io/boilerplate), a tool authored by Gruntwork for generating files and folders specially for DevOps use cases. Clone the newly created `infrastructure-pipelines` repository, `cd` into the repo directory, then use the following command replacing `<your GitHub organization name>` with the name of your GitHub organization and `<your infrastructure-live repo name>` with the name of your infrastructure-live repository.

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/infrastructure-pipelines?ref=devops-foundations" \
  --output-folder . \
  --var InfraLiveRepoName="<your infrastructure-live repo name>" \
  --var GithubOrg="<your GitHub organization name>" \
  --non-interactive
```

Push your changes up to the remote repository.

## Create AWS IAM roles for Pipelines

In Pipelines, each of your accounts must have an AWS IAM role. This role shares the same permissions as the one used in ECS Deploy Runner, except for the new role's trust policy, which enables GitHub Actions Workflows running in your `infrastructure-pipelines` to assume the role using OIDC. This capability allows workflows to create and utilize short-lived session tokens whenever they run, in contrast to relying on long-lived credentials stored as secrets.

For more information see [security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) and [OpenID Connect in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

### Generate the code using boilerplate for each account

To simplify the migration process, we have developed a template that creates all code and files required to generate the IAM role, OpenID Connect identity provider, and IAM policies.

Use the following command, replacing the values wrapped in `<>` with real values for your organization. The `AwsAccountName` variable should be the name of the top level directory that represents the AWS account that will use Pipelines (e.g, `dev`). You will need to run this command for each account that you would like to upgrade to Pipelines.

Now `cd` into your `infrastructure-live` repository and run the following command:

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/pipelines-edr-migration" \
    --output-folder . \
    --var InfraPipelinesRepoName="<your infrastructure-pipelines repo name>" \
    --var GithubOrg="<your GitHub organization name>" \
    --var AwsAccountName="<friendly name for your AWS account (e.g., dev)>"  \
    --var RequestingTeamName="<The name of the team that will use the pipeline>"  \
    --var AwsAccountName="<friendly name for your AWS account (e.g., dev)>"  \
    --var OrgNamePrefix="The name prefix to use for creating resources" \
    --non-interactive
```

Create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`).

:::tip
We recommend trying out Pipelines in non-production environments first, before rolling out to production environments.
:::

### Planning and applying

Create a new branch for your changes, commit your changes to your branch, then push your branch. Next, create a PR to merge your branch into `main` (the default branch in your repository). The ECS Deploy Runner will detect the change and run a `plan` to create the IAM Roles, OpenID Connect providers, and all requires IAM policies. Review the `plan` output and confirm it looks as expected.

Once you have reviewed the `plan` output and gotten any necessary approvals, merge the PR. The EDR version of Pipelines will run `apply` to create the resources.

## Set up secrets

Pipelines requires the use of GitHub personal access tokens (PAT) to allow workflows in the `infrastructure-live` to run workflows in the `infrastructure-pipelines` repository and workflows in the `infrastructure-pipelines` repository access to the code in `infrastructure-live` as well as repos for the Gruntwork Library. This section will guide you in establishing secrets in both repositories and comprehending the security implications of the multi-PAT configuration.

### Infrastructure live

Navigate to your `infrastructure-live` repository (it may be named `<your-company>-infrastructure-live`). Select the **Settings** tab, select the **Secrets and variables** drop down on the left side panel, then select **Actions**. Create three secrets named `GRUNTWORK_CODE_ACCESS_TOKEN`, `PIPELINES_DISPATCH_TOKEN`, and `INFRA_LIVE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [GitHub Personal Access Token Setup](#github-personal-access-token-setup) for the secret value.

### Infrastructure pipelines

Navigate to the `infrastructure-pipelines` repository. Select the **Settings** tab, select the **Secrets and variables** drop down on the left side panel, then select **Actions**. Create two secrets named `INFRA_LIVE_ACCESS_TOKEN` and `GRUNTWORK_CODE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [GitHub Personal Access Token Setup](#github-personal-access-token-setup) for the secret value.

## Updating your accounts file

As part of a separate product improvement initiative, we have transitioned from the `accounts.json` file to `accounts.yml`. This change not only enhances readability but is also functionally better, with Terraform's built-in YAML formatter better meeting our requirement for regenerating a formatted file to facilitate the addition of new accounts through GitOps workflows. It's important to note that there is no functional distinction between these two file types in either the EDR version of Pipelines or Pipelines.

### Upgrade from accounts.json to accounts.yml

The data required in `accounts.yml` is the same that is required in `accounts.json`. You can quickly convert your `accounts.json` to `accounts.yml` by using the [yq](https://github.com/mikefarah/yq) CLI tool and the following command.

```bash
cat accounts.json | yq -P > accounts.yml
```

Confirm the data matches between your `accounts.json` and `accounts.yml`. If you are upgrading all of your deployments at once, you may delete your `accounts.json` file. If you will use both ECS Deploy Runner and Pipelines at the same time, do not delete `accounts.json`.

## Add new workflows in your infrastructure-live repository

Similar to ECS Deploy Runner, Pipelines employs GitHub Actions as the computing layer to execute actions on your infrastructure. However,  Pipelines uses a different workflow with a smaller number of steps and the Pipelines binary responsible for orchestrating changes. To simplify the upgrade process, we've created a template that can be used to generate the workflow with a small number of parameters. In both workflows, the workflow file named `pipelines.yml` is utilized, so generating the new workflow will overwrite the old.

:::warning
If you plan to use ECS Deploy Runner and Pipelines at the same time, to migrate from one to the other, you will need to rename your existing `pipelines.yml` to another name before generating the new `pipelines.yml` for Pipelines.

You will also need to ignore changes to files in account based directories that you have and have not migrated yet using `paths-ignore` in the appropriate workflow file. For example, if you have migrated your development account to Pipelines, you would add `development/` to `paths-ignore` in the ECS Deploy Runner workflow yaml, then add `development` to `paths` in the Pipelines workflow yaml.

See the GitHub docs on [including and excluding paths](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-including-paths) to learn more.
:::

To generate the new `pipelines.yml` file, run the following command, replacing the values in `<>` with appropriate values for your organization -

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/infra-live-github-base" \
    --output-folder ./infrastructure-live/.github \
    --var InfraPipelinesRepoName="<your infra pipelines repo name>" \
    --var GithubOrg="<your GitHub org name>" \
    --var AwsAccountName="<your AWS Account Name>"  \
    --non-interactive
```

Next, create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`). Gather any required approvals then

## Remove old ECS Deploy Runner infrastructure

After you have confirmed Pipelines is running in your account(s), you can destroy the infrastructure that the ECS Deploy Runner used. With Pipelines now fully functional, you can initiate the infrastructure destruction process by submitting a pull request (PR) for each of the directories containing the EDR configuration. Subsequently, you can submit a final PR to remove any remaining EDR configuration within your _envcommon directory.

### Delete code for old pipelines

For each environment in which you have deployed the ECS deploy runner, remove the `ecs-deploy-runner` directory. This can be found in the file path `<account name>/<region name>/mgmt`.

:::tip
We recommend migrating to Pipelines in non-production accounts first, then migrating production accounts after a few weeks of trying out Pipelines. This allows time for you to familiarize yourself with Pipelines and reduces the likelihood of disruption to your workflows and day-to-day operations.
:::

Create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`). Pipelines will detect the change and run a `plan -destroy` to remove the ECS deploy runner infrastructure. Gather any required approvals then merge the PR. On PR merge, Pipelines will run a `destroy` to remove all of the infrastructure.

## Wrapping up

Congratulations! If you have followed this guide, you will be deploying infrastructure to at least one AWS account using Pipelines. If you have feedback, please reach out to `feedback@gruntwork.io`.
