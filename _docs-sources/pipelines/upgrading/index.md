# Upgrading from the ECS Deploy Runner

This migration guide is intended for those running the ECS Deploy Runner (EDR) based Gruntwork Pipelines upgrading to Pipelines v2. Upgrading can be done using Pipelines itself in a series of steps using code generation and pull requests.

## Prerequisites

- Boilerplate
- Ability to create repositories in your GitHub Organization
- Ability to add users to your GitHub Organization
- Permissions to create secrets in GitHub repositories

## Token Setup

Pipelines v2 uses a series of tokens in workflows, each token limited to the smallest set of permissions it requires to do exactly what it needs to do. In order to ensure we can apply the principle of least privilege to each token, we recommend having two separate users - the existing CI user that you already have and a new CI Read Only user, that has access to read your `infrastructure-live` repository, `infrastructure-modules` repository (if applicable), and the Gruntwork Library.

### Creating a CI Read Only User

Follow the steps on [signing up a new GitHub account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) to create a new user. If you have an e-mail address for your existing CI user, we recommend using plus addressing, such as `ci+read-only@your-domain.com`, as the e-mail address for the new account.

Add the new user to your GitHub org, adding it to a Team with read only access to your `infrastructure-live` and `infrastructure-modules` repository (if applicable). Follow the steps on [adding a user to the Gruntwork Developer portal](../../developer-portal/invite-team.md) to grant the CI Read Only user access to the Gruntwork Library.

### Creating tokens for Workflows

- `GRUNTWORK_CODE_ACCESS_TOKEN`: Classic token with READ access to repos. This should should be associated with the `CI Read Only` user created in [creating a CI Read only user](#creating-a-ci-read-only-user).
- `PIPELINES_DISPATCH_TOKEN`: Fine Grained token that only has workflow permissions to execute workflows in the `infrastructure-pipelines` repository. This token should be associated with your existing CI user.
- `INFRA_LIVE_ACCESS_TOKEN`: Fine grained token with READ and WRITE access to your `infrastructure-live` repository. This token should be associated with your existing CI user.

## Creating your infrastructure-pipelines repository

Pipelines v2 uses a two repository approach to isolate infrastructure as code (IaC) code definitions and IaC deployment mechanisms. This means that the code that deploys your IaC and access to your AWS accounts is stored in a single, locked down, repository, that a limited subset of administrators have write access to. Workflows in this repository use OpenId Connect (OIDC) and AWS IAM roles to create short lived session credentials, rather than long lived credentials stored as secrets.

We strongly recommend naming this repository `infrastructure-pipelines`. All code generated assumes the repository will be located at `<your GitHub Organization>/infrastructure-pipelines`, so using a different name will require manual work on your behalf.

### Create the repo

Navigate to the repositories tab of your organization or personal GitHub account in your web browser.

1. Click the `New Repository` button.
1. In the `Repository name` field enter `infrastructure-pipelines`
1. Select the `Private` option
1. Do not initialize the repo with a README, gitignore, or license

:::info
For a simple proof of concept, the default repo configuration will suffice. Before using these repositories in a production environment, we recommend setting up a [branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) for your `main` branch. At a minimum, we recommend enabling requiring a pull request before merging with at least one reviewer required.
:::

### Use boilerplate to generate code

Generate the `infrastructure-pipelines` repository code using Boilerplate. Use the following command replacing `<your GitHub organization name>` with the name of your GitHub organization and `<your infrastructure-live repo name>` with the name of your infrastructure-live repository.

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/infrastructure-pipelines?ref=devops-foundations" \
  --output-folder ./infrastructure-pipelines \
  --var InfraLiveRepoName="<your infrastructure-live repo name>" \
  --var GithubOrg="<your GitHub organization name>" \
  --non-interactive
```

Push your changes up to the remote repository.

## Creating AWS IAM roles for Pipelines

Pipelines v2 requires an AWS IAM role in each of your accounts. This role has the same permissions as the role used for EDR based pipelines, with the exception that the new role has a trust policy which allows GitHub Actions Workflows running in your `infrastructure-pipelines` to assume the role using OIDC. This allows workflows to generate and use short lived session tokens, rather than long lived credentials stored as secrets, each time a workflow runs.

For more information see [security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) and [OpenID Connect in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

### Generate the code using boilerplate for each account

- Run boilerplate for each account
- Push branch

### Planning and applying

Create a new branch for your changes, commit your changes to your branch, then push your branch. Next, create a PR to merge your branch into `main` (the default branch in your repository). The EDR version of pipelines will detect the change and run a `plan` to create the IAM Roles, OpenID Connect providers, and all requires IAM policies. Review the `plan` output and confirm it looks as expected.

Once you have reviewed the `plan` output and gotten any necessary approvals, merge the PR. The EDR version of pipelines will run `apply` to create the resources.

## Setting up secrets

Pipelines V2 requires the use of GitHub personal access tokens (PAT) to allow workflows in the `infrastructure-live` to run workflows in the `infrastructure-pipelines` repository and the workflows in the `infrastructure-pipelines` repository access to the code in `infrastructure-live` as well as repos for the Gruntwork Library. In this section you will set up secrets in both repositories as well as gain an understanding of the security posture of the multi-PAT setup.

### Infrastructure live

Navigate to your `infrastructure-live` repository (it may be named `<your-company>-infrastructure-live`). Select the `Settings` tab, select the `Secrets and variables` drop down on the left side panel, then select `Actions`. Create three secrets named `GRUNTWORK_CODE_ACCESS_TOKEN`, `PIPELINES_DISPATCH_TOKEN`, and `INFRA_LIVE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [creating tokens for workflows](#creating-tokens-for-workflows) for the secret value.

### Infrastructure pipelines

Navigate to the `infrastructure-pipelines` repository. Select the `Settings` tab, select the `Secrets and variables` drop down on the left side panel, then select `Actions`. Create two secrets named `INFRA_LIVE_ACCESS_TOKEN` and `GRUNTWORK_CODE_ACCESS_TOKEN`. Use the corresponding value from the tokens you created in [creating tokens for workflows](#creating-tokens-for-workflows) for the secret value.

## Updating your accounts file

As a part of separate product improvement the `accounts.json` file has been changed to `accounts.yml`. In addition to readability improvements, we found that Terraform's built-in YAML formatters better supported our use case of re-generating this file to support adding new accounts using GitOps workflows. There is no functional difference between the two different file types in the EDR version of pipelines or pipelines v2.

### Upgrade from accounts.json to accounts.yml

- schema for accounts.yml
- maybe a script here too
- After this point old pipelines will stop working!

## Adding new workflows in your infrastructure-live repository

Like the EDR version of pipelines, pipelines v2 uses GitHub Actions as the compute layer for executing actions on your infrastructure. Pipelines v2 uses a different workflow with a smaller number of steps and the pipelines binary to orchestrate changes. To streamline the upgrade process, we've created a template that can be used to generate the workflow with a small number of parameters.

- Run boilerplate
- Push changes

### Delete the previous GitHub workflows action for pipelines v1

- Delete the file
- Push changes

## Remove old ECS Deploy Runner infrastructure

After you have confirmed pipelines v2 is running in your account(s), you can destroy the infrastructure that the EDR pipelines used. Since pipelines v2 is fully functioning at this point, you can use it to destroy the infrastructure for you by submitting a PR for each of the directories that contained the EDR configuration, then a final PR to clean up any EDR configuration that exists in your `_envcommon` directory.

### Delete code for old pipelines

- Delete path/to/folder/with/edr in all repos

### Planning and Applying

- Push branch
- Let new pipelines run plan
- Review output
- Merge PR
- Let new pipelines run apply
