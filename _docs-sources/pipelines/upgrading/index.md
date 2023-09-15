# Upgrading from the ECS Deploy Runner

This migration guide is intended for those running the ECS Deploy Runner (EDR) based Gruntwork Pipelines upgrading to Pipelines v2. Upgrading can be done using Pipelines itself in a series of steps using code generation and pull requests.

## Prerequisites

- Boilerplate
- Ability to create repositories in your GitHub Organization
- Permissions to create secrets in GitHub repositories

## Creating your infrastructure-pipelines repository

Pipelines v2 uses a two repository approach to isolate infrastructure as code (IaC) code definitions and IaC deployment mechanisms. This means that the code that deploys your IaC and access to your AWS accounts is stored in a single, locked down, repository, that a limited subset of administrators have write access to. Workflows in this repository use OpenId Connect (OIDC) and AWS IAM roles to create short lived session credentials, rather than long lived credentials stored as secrets.

We strongly recommend naming this repository `infrastructure-pipelines`. All code generated assumes the repository will be located at `<your GitHub Organization>/infrastructure-pipelines`, so using a different name will require manual work on your behalf.

### Create the repo

- Navigate to GitHub UI
- Create repo
- Set up branch protections

### Use boilerplate to generate code

- Run boilerplate
- Push up code

## Creating AWS IAM roles for Pipelines

Pipelines v2 requires an AWS IAM role in each of your accounts. This role has the same permissions as the role used for EDR based pipelines, with the exception that the new role has a trust policy which allows GitHub Actions Workflows running in your `infrastructure-pipelines` to assume the role using OIDC. This allows workflows to generate and use short lived session tokens, rather than long lived credentials stored as secrets, each time a workflow runs.

For more information see [security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) and [OpenID Connect in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

### Generate the code using boilerplate for each account

- Run boilerplate for each account
- Push branch

### Planning and applying
- Make PR
- Let old pipelines plan
- Review output
- Merge PR
- Let old pipelines apply

## Setting up secrets

Pipelines V2 requires the use of GitHub personal access tokens (PAT) to allow workflows in the `infrastructure-live` to run workflows in the `infrastructure-pipelines` repository and the workflows in the `infrastructure-pipelines` repository access to the code in `infrastructure-live` as well as repos for the Gruntwork Library. In this section you will set up secrets in both repositories as well as gain an understanding of the security posture of the multi-PAT setup.

### Infrastructure live

- Add two secrets
- POLP call out

### Infrastructure pipelines

- Add three secrets
- POLP call out

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
