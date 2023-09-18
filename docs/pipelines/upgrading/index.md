# Upgrading from the ECS Deploy Runner

This migration guide is intended for those running the ECS Deploy Runner (EDR) based Gruntwork Pipelines upgrading to Modern Gruntwork Pipelines. Upgrading can be done using Pipelines itself in a series of steps using code generation and pull requests.

To accomplish this task, We'll be using EDR Pipelines to deploy Modern Gruntwork Pipelines, then using Modern Gruntwork Pipelines to destroy EDR Pipelines.

## Prerequisites

- [Boilerplate](https://github.com/gruntwork-io/boilerplate#install) installed on your system (requires Gruntwork subscription)
- Ability to create repositories in your GitHub Organization
- Ability to add users to your GitHub Organization and the Gruntwork Developer Portal
- Permissions to create secrets in GitHub repositories

## Token Setup

Modern Gruntwork Pipelines uses several tokens across workflows, with each token possessing only the minimal set of permissions necessary for its specific task. To uphold the principle of least privilege for each token, we advise maintaining two distinct users: the pre-existing CI user and a new CI Read Only user. The CI Read Only user should have access to read your infrastructure-live repository, infrastructure-modules repository (if applicable), and the Gruntwork Library.

### Creating a CI Read Only User

Follow the steps on [signing up a new GitHub account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) to create a new user. If you have an e-mail address for your existing CI user, we recommend using plus addressing, such as `ci+read-only@your-domain.com`, as the e-mail address for the new account.

Add the new user to your GitHub org, adding it to a Team with read only access to your `infrastructure-live` and `infrastructure-modules` repository (if applicable). Follow the steps on [adding a user to the Gruntwork Developer portal](../../developer-portal/invite-team.md) to grant the CI Read Only user access to the Gruntwork Library.

### Creating tokens for Workflows

- `GRUNTWORK_CODE_ACCESS_TOKEN`: Classic token with READ access to repos. This should should be associated with the `CI Read Only` user created in [creating a CI Read only user](#creating-a-ci-read-only-user).
- `PIPELINES_DISPATCH_TOKEN`: Fine Grained token that only has workflow permissions to execute workflows in the `infrastructure-pipelines` repository. This token should be associated with your existing CI user.
- `INFRA_LIVE_ACCESS_TOKEN`: Fine grained token with READ and WRITE access to your `infrastructure-live` repository. This token should be associated with your existing CI user.

## Creating your infrastructure-pipelines repository

Modern Gruntwork Pipelines employ a dual-repository approach to isolate infrastructure as code (IaC) code definitions and IaC deployment mechanisms. This approach signifies that a single, highly secured repository, with write access limited to a specific group of administrators, contains both the code responsible for deploying your IaC and the access to your AWS accounts. Workflows within this repository leverage OpenId Connect (OIDC) and AWS IAM roles for creating short-lived session credentials, as opposed to storing long-lived credentials as secrets.

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

Next, generate the `infrastructure-pipelines` repository code using Boilerplate. Clone the newly created `infrastructure-pipelines` repository, cd into the repo directory, then use the following command replacing `<your GitHub organization name>` with the name of your GitHub organization and `<your infrastructure-live repo name>` with the name of your infrastructure-live repository.

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/infrastructure-pipelines?ref=devops-foundations" \
  --output-folder . \
  --var InfraLiveRepoName="<your infrastructure-live repo name>" \
  --var GithubOrg="<your GitHub organization name>" \
  --non-interactive
```

Push your changes up to the remote repository.

## Creating AWS IAM roles for Pipelines

In Modern Gruntwork Pipelines, each of your accounts must have an AWS IAM role. This role shares the same permissions as the one used in EDR-based pipelines, except for the new role's trust policy, which enables GitHub Actions Workflows running in your `infrastructure-pipelines` to assume the role using OIDC. This capability allows workflows to create and utilize short-lived session tokens whenever they run, in contrast to relying on long-lived credentials stored as secrets.

For more information see [security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) and [OpenID Connect in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

### Generate the code using boilerplate for each account

To simplify the migration process, we have developed a template that creates all code and files required to generate the IAM role, OpenID Connect identity provider, and IAM policies.

Use the following command, replacing the values wrapped in `<>` with real values for your organization. The `AwsAccountName` variable should be the name of the top level directory that represents the AWS account that will use Modern Gruntwork Pipelines (e.g, `dev`). You will need to run this command for each account that you would like to upgrade to Modern Gruntwork Pipelines.

cd into your `infrastructure-live` repository and run the following command:

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/pipelines-edr-migration" \
    --output-folder . \
    --var InfraPipelinesRepoName="<your infrastructure-pipelines repo name>" \
    --var GithubOrg="<your GitHub organization name>" \
    --var AwsAccountName="<friendly name for your AWS account (e.g., dev)>"  \
    --non-interactive
```

Create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`).

:::tip
We recommend trying out pipelines in non-production environments first, before rolling out to production environments.
:::

### Planning and applying

Create a new branch for your changes, commit your changes to your branch, then push your branch. Next, create a PR to merge your branch into `main` (the default branch in your repository). The EDR version of pipelines will detect the change and run a `plan` to create the IAM Roles, OpenID Connect providers, and all requires IAM policies. Review the `plan` output and confirm it looks as expected.

Once you have reviewed the `plan` output and gotten any necessary approvals, merge the PR. The EDR version of pipelines will run `apply` to create the resources.

## Setting up secrets

Modern Gruntwork Pipelines requires the use of GitHub personal access tokens (PAT) to allow workflows in the `infrastructure-live` to run workflows in the `infrastructure-pipelines` repository and workflows in the `infrastructure-pipelines` repository access to the code in `infrastructure-live` as well as repos for the Gruntwork Library. This section will guide you in establishing secrets in both repositories and comprehending the security implications of the multi-PAT configuration.

### Infrastructure live

Navigate to your `infrastructure-live` repository (it may be named `<your-company>-infrastructure-live`). Select the **Settings** tab, select the **Secrets and variables** drop down on the left side panel, then select **Actions**. Create three secrets named `GRUNTWORK_CODE_ACCESS_TOKEN`, `PIPELINES_DISPATCH_TOKEN`, and `INFRA_LIVE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [creating tokens for workflows](#creating-tokens-for-workflows) for the secret value.

### Infrastructure pipelines

Navigate to the `infrastructure-pipelines` repository. Select the **Settings** tab, select the **Secrets and variables** drop down on the left side panel, then select **Actions**. Create two secrets named `INFRA_LIVE_ACCESS_TOKEN` and `GRUNTWORK_CODE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [creating tokens for workflows](#creating-tokens-for-workflows) for the secret value.

## Updating your accounts file

As a part of separate product improvement the `accounts.json` file has been changed to `accounts.yml`. In addition to readability improvements, we found that Terraform's built-in YAML formatters better supported our use case of re-generating this file to support adding new accounts using GitOps workflows. There is no functional difference between the two different file types in the EDR version of pipelines or Modern Gruntwork Pipelines.

As part of a separate product improvement initiative, we have transitioned from the `accounts.json` file to `accounts.yml`. This change not only enhances readability but is also functionally better, with Terraform's built-in YAML formatter better meeting our requirement for regenerating a formatted file to facilitate the addition of new accounts through GitOps workflows. It's important to note that there is no functional distinction between these two file types in either the EDR version of pipelines or Modern Gruntwork Pipelines.

### Upgrade from accounts.json to accounts.yml

The data required in `accounts.yml` is the same that is required in `accounts.json`. You can quickly convert your `accounts.json` to `accounts.yml` by using the [yq](https://github.com/mikefarah/yq) CLI tool and the following command.

```bash
cat accounts.json | yq -P > accounts.yml
```

Confirm the data matches between your `accounts.json` and `accounts.yml`. If you are upgrading all of your deployments at once, you may delete your `accounts.json` file. If you will use both EDR pipelines and Modern Gruntwork Pipelines at the same time, do not delete `accounts.json`.

## Adding new workflows in your infrastructure-live repository

Similar to the EDR version of pipelines, Modern Gruntwork Pipelines employ GitHub Actions as the computing layer to execute actions on your infrastructure. However,  Modern Gruntwork Pipelines uses a different workflow with a smaller number of steps and the pipelines binary responsible for orchestrating changes. To simplify the upgrade process, we've created a template that can be used to generate the workflow with a small number of parameters. In both workflows, the workflow file is named pipelines.yml is utilized, so generating the new workflow will overwrite the old.

:::warning
If you plan to use EDR pipelines and Modern Gruntwork Pipelines at the same time, to migrate from one to the other, you will need to rename your existing `pipelines.yml` to another name before generating the new `pipelines.yml` for Modern Gruntwork Pipelines.

You will also need to ignore changes to files in account based directories that you have and have not migrated yet using `paths-ignore` in the appropriate workflow file. For example, if you have migrated your development account to Modern Gruntwork Pipelines, you would add `development/` to `paths-ignore` in the EDR pipelines workflow yaml, then add `development` to `paths` in the Modern Gruntwork Pipelines workflow yaml.

See the GitHub docs on [including and excluding paths](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-including-paths) to learn more.
:::

To generate the new `pipelines.yml` file, run the following command -

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/infra-live-github-base" \
    --output-folder ./infrastructure-live/.github \
    --var InfraPipelinesRepoName="test-arch" \
    --var GithubOrg="acme" --var AwsAccountName="dev"  \
    --non-interactive
```

Next, create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`). Gather any required approvals then

## Remove old ECS Deploy Runner infrastructure

After you have confirmed Modern Gruntwork Pipelines is running in your account(s), you can destroy the infrastructure that the EDR pipelines used. With Modern Gruntwork Pipelines now fully functional, you can initiate the infrastructure destruction process by submitting a pull request (PR) for each of the directories containing the EDR configuration. Subsequently, you can submit a final PR to remove any remaining EDR configuration within your _envcommon directory.

### Delete code for old pipelines

For each environment in which you have deployed the ECS deploy runner, remove the `ecs-deploy-runner` directory. This can be found in the file path `<account name>/<region name>/mgmt`.

:::tip
We recommend migrating to Modern Gruntwork Pipelines in non-production accounts first, then migrating production accounts after a few weeks of trying out Modern Gruntwork Pipelines. This allows time for you to familiarize yourself with Modern Gruntwork Pipelines and reduces the likelihood of disruption to your workflows and day-to-day operations.
:::

Create a branch, commit your changes, and push your branch to the remote repository. Then create a pull request targeting your default branch (e.g., `main`). Modern Gruntwork Pipelines will detect the change and run a `plan -destroy` to remove the ECS deploy runner infrastructure. Gather any required approvals then merge the PR. On PR merge, Modern Gruntwork Pipelines will run a `destroy` to remove all of the infrastructure.

## Wrapping up

Congratulations! If you have followed this guide, you will be deploying infrastructure to at least one AWS account using Modern Gruntwork Pipelines. If you have feedback, please reach out to `feedback@gruntwork.io`.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "63c4dc0c372e262b8d817fc30e7e33ef"
}
##DOCS-SOURCER-END -->
