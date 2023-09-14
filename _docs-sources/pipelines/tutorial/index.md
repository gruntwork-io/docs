# Single Account Tutorial

In this tutorial, you’ll walk you through the process of setting up Gruntwork Pipelines in a single AWS account. By the end, you’ll have:
- An automated pipeline for deploying infrastructure changes into an AWS account
- Two GitHub repositories
    - `infrastructure-live` — Defines the infrastructure that is deployed to your AWS account
    - `infrastructure-pipelines` — Contains deployment definitions for your infrastructure
- IAM role in your AWS account that allows GitHub Actions to assume a role in your AWS account using OIDC
- An S3 Bucket deployed automatically by Gruntwork Pipelines

## Prerequisites

Before you begin, make sure you have:

1. Permissions to create and administer repositories in your GitHub organization
1. Valid [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for an IAM user with AdministratorAccess
1. [Gruntwork Boilerplate](https://github.com/gruntwork-io/boilerplate/releases) installed on your system (requires Gruntwork subscription)
    1. Download the release that is appropriate for your operating system
    1. Move to /usr/local/bin
    1. Confirm installation with w/ `boilerplate --version`
1. [Terragrunt](https://terragrunt.gruntwork.io/) installed on your system

## Setting up the repositories

First, you'll set up two repositories which will contain the definitions of your infrastructure as code (IaC) and another that defines deployment mechanisms for your IaC. Then, you'll create a Github Personal Access Token (PAT) in each repository to allow GitHub Actions to allow the `infrastructure-live` repo to run workflows defined in `infrastructure-pipelines` and to allow the workflows define in `infrastructure-pipelines` to clone the `infrastructure-live` repo. Finally, you'll set up your PAT as a GitHub Actions secret in each repository.

### Create repos in your org

1. Navigate to GitHub
1. Create one repo named `infrastructure-live`
    1. Set up branch protections
1. Create a repo named `infrastructure-pipelines`
    1. Repeat steps to set up branch protections

### Set up secrets in repos

1. Generate tokens
    1. For demos sake, just use a single token. In a production deployment, we recommend using several tokens, mixing fine grained and classic PATs.
1. In the `infrastructure-live` repository, navigate to Settings -> Actions -> Secrets
    1. Create three secrets - `GRUNTWORK_CODE_ACCESS_TOKEN`, `PIPELINES_DISPATCH_TOKEN`, `INFRA_LIVE_ACCESS_TOKEN` with your PAT
1. In the `infrastructure-pipelines` repository, navigate to Settings -> Actions -> Secrets
    1. Create two secrets - `INFRA_LIVE_ACCESS_TOKEN` and `GRUNTWORK_CODE_ACCESS_TOKEN` with your PAT

## Generating code

Next, you'll generate the IaC and GitHub Actions Workflow code required to run Gruntwork Pipelines. We'll provision an AWS IAM role (which pipelines assumes to create resources), one workflow for the `infrastructure-live` repository, and one workflow for the `infrastructure-pipelines` repository. The template for `infrastructure-live` sets up a folder structure that complies with Gruntwork's recommended folder structure for Terragrunt, so you could continue to use the generated code in perpetuity and simply add more accounts and resource definitions if you so choose!

### Infrastructure pipelines

1. Run boilerplate for infra-pipelines
1. Validate code
1. Push up infra-pipelines

### Infrastructure live
1. Run boilerplate for infra-live
1. Validate code
1. Apply the GitHub OIDC role for pipelines
    1. cd in `<account name>/_global/github-oidc-role`
    1. Run `terragrunt plan`
        1. Inspect output
    1. Run `terragrunt apply`
1. Push up infra-live

## Run your first pipeline

Next you'll create a resource in your AWS account using Pipelines and GitOps workflows. You'll define an infrastructure unit that creates AWS S3 bucket in your account, push your changes and create pull request (PR) to run a `plan` action, then run an `apply` action to create the bucket by merging your PR.

### Adding a new S3 bucket infrastructure-unit

1. Add S3 infrastructure unit file structure to your infrastructure-live repository
    1. mkdir -p `<account name>/us-east-1/<account name>/data-storage/s3`
    1. touch `<account name>/us-east-1/<account name>/data-storage/s3/terragrunt.hcl`
1. Add contents
```hcl
# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/s3-bucket?ref=v0.104.15"
}

include "root" {
  path = find_in_parent_folders()
}

inputs = {
  primary_bucket = "<globally unique-bucket-name>-<region>"
}
```

### Planning and Applying

1. Push branch
1. Create a PR and observe plan run, go through logs
1. Merge branch
1. Watch the apply run

## Wrapping up

Continue using pipelines on your own by adding additional infrastructure units to your environment. Alternatively, create a `_module_defaults` directory and define a module there, then use it in your environment to see how pipelines handles these types of changes.

You also can extend your usage across many AWS accounts by re-running the `infrastructure-live` boilerplate template to create the folder structure for additional accounts (you will need to manually update your `accounts.yml` file with this approach).

## Cleanup (optional)

If you are not going to continue using Pipelines after this tutorial, clean up the resources you created by running `terragrunt run-all destroy` from your account based folder. You may also delete the two repositories created in [Setting up the repositories](#setting-up-the-repositories).
