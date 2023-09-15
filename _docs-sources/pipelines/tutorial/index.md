# Single Account Tutorial

In this tutorial, we’ll walk you through the process of setting up Gruntwork Pipelines in a single AWS account. By the end, you’ll have:

- An automated pipeline for deploying infrastructure changes into an AWS account
- Two GitHub repositories
  - `infrastructure-live` — Defines the infrastructure that is deployed to your AWS account
  - `infrastructure-pipelines` — Contains deployment definitions for your infrastructure
- IAM role in your AWS account that allows GitHub Actions to assume a role in your AWS account using OIDC
- An S3 Bucket deployed automatically by Gruntwork Pipelines

## Prerequisites

Before you begin, make sure you have:

- Permissions to create and administer repositories in GitHub
- A sandbox or development AWS account
- Valid [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for an IAM user with AdministratorAccess to the AWS account mentioned above
- [Boilerplate](https://github.com/gruntwork-io/boilerplate#install) installed on your system (requires Gruntwork subscription)
- [Terragrunt](https://terragrunt.gruntwork.io/) installed on your system
- A [classic GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with `repo` scopes and access to Gruntwork modules

## Setting up the repositories

First, you’ll set up two repositories which will contain the definitions of your infrastructure as code (IaC) and another that defines deployment mechanisms for your IaC. Then, you’ll create a Github Personal Access Token (PAT) in each repository to allow GitHub Actions to allow the `infrastructure-live` repo to run workflows defined in `infrastructure-pipelines` and to allow the workflows define in `infrastructure-pipelines` to clone the `infrastructure-live` repo. Finally, you’ll set up your PAT as a GitHub Actions secret in each repository.

### Create the repositories

Navigate to the repositories tab of your organization or personal GitHub account in your web browser. Repeat the following steps twice to create one repository named `infrastructure-live` and one repository named `infrastructure-pipelines`.

1. Click the `New Repository` button.
1. In the `Repository name` field enter either `infrastructure-live` or `infrastructure-pipelines`
1. Select the `Private` option
1. Do not initialize the repo with a README, gitignore, or license

![GitHub form for creating a new repository](/img/pipelines/tutorial/create_new_repo_form.png)

:::warning
For a simple proof of concept, the default repo configuration will suffice. Before using these repositories in a production environment, we recommend setting up a [branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) for your `main` branch. At a minimum, we recommend enabling requiring a pull request before merging with at least one reviewer required.
:::

### Setting up secrets

Next, configure the required secrets for each repository to allow cross repository access from the `infrastructure-live` and `infrastructure-pipelines` repositories. This is required so `infrastructure-live` can kick off workflows in the `infrastructure-pipeline` repository and the `infrastructure-pipelines` repository can clone your `infrastructure-live` repository as well as access Gruntwork modules.

First, navigate to the `infrastructure-live` repository. Select the `Settings` tab, select the `Secrets and variables` drop down on the left side panel, then select `Actions`. Create three secrets named `GRUNTWORK_CODE_ACCESS_TOKEN`, `PIPELINES_DISPATCH_TOKEN`, and `INFRA_LIVE_ACCESS_TOKEN`. Use your GitHub PAT as the value for all three secrets.

Next, Navigate to the `infrastructure-pipelines` repository. Select the `Settings` tab, select the `Secrets and variables` drop down on the left side panel, then select `Actions`. Create two secrets named `INFRA_LIVE_ACCESS_TOKEN` and `GRUNTWORK_CODE_ACCESS_TOKEN`. Use your GitHub PAT as the value for both secrets.

:::warning
Using a single token with broad access is sufficient for a POC or demo environments. In a production deployment, we recommend using a mix of fine grained and classic PATS to apply the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) to all tokens used in pipelines workflows.
:::

## Generating code

Next, you’ll generate the IaC and GitHub Actions Workflow code required to run Gruntwork Pipelines. We'll provision an AWS IAM role (which pipelines assumes to create resources), one workflow for the `infrastructure-live` repository, and one workflow for the `infrastructure-pipelines` repository. The template for `infrastructure-live` sets up a folder structure that complies with Gruntwork’s recommended folder structure for Terragrunt, so you could continue to use the generated code in perpetuity and simply add more accounts and resource definitions if you so choose!

### Infrastructure pipelines

First, generate the `infrastructure-pipelines` repository code using Boilerplate. Use the following command replacing `<your GitHub organization name>` with the name of your GitHub organization.

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/infrastructure-pipelines?ref=devops-foundations" \
  --output-folder ./infrastructure-pipelines \
  --var InfraLiveRepoName="infrastructure-live" \
  --var GithubOrg="<your GitHub organization name>" \
  --non-interactive
```

Push your changes to the `infrastructure-pipelines` repository you created in [Create repos in your org](#create-repos-in-your-org).

### Infrastructure live

Next, generate the `infrastructure-live` repository code using Boilerplate. Use the following command, replacing the values wrapped in `<>` with real values for your organization.

```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//blueprints/components/single-account-pipeline?ref=devops-foundations" \
  --output-folder ./infrastructure-live \
  --var AwsAccountName="<friendly name for your AWS account (e.g., dev)>" \
  --var AwsAccountId="'<account id for your AWS account>'" \
  --var AwsAccountEmail="<e-mail address associate with root user for account>" \
  --var InfraLiveRepoName="infrastructure-live" \
  --var InfraPipelinesRepoName="infrastructure-pipelines" \
  --var GithubOrg="<your GitHub organization name>" \
  --var OrgNamePrefix="<your organization name>" \
  --non-interactive
```

Before pushing your changes, you will need to run an `apply` locally to provision the AWS IAM role that pipelines will use to deploy resources in your account. This should be the only time you need to manually run `apply` to provision resources for this account, moving forward pipelines will handle all the lifecycle of all resources for you, based on the code you commit to your repository.

First, run a `plan` in the newly created `github-oidc-role` directory to see the resources that will be provisioned. Replace `<account name>` with the value you used for `AwsAccountName` in the boilerplate command above.

```bash
cd <account name>/_global/github-oidc-role
terragrunt plan
```

Once you have reviewed the new resources that will be created, run `terragrunt apply` to create the resources.

Finally, push your changes to the `infrastructure-live` repository you created in [Create repos in your org](#create-repos-in-your-org).

## Running your first pipeline

Next you’ll create a resource in your AWS account using pipelines and GitOps workflows. you’ll define an infrastructure unit that creates AWS S3 bucket in your account, push your changes and create pull request (PR) to run a `plan` action, then run an `apply` action to create the bucket by merging your PR.

### Adding a new S3 bucket infrastructure-unit

First, create the file structure that will contain the infrastructure unit that defines an S3 bucket in your environment. Replace `<account name>` with the value you used for `AwsAccountName` when generating your `infrastructure-live` code in the [infrastructure live](#infrastructure-live) section.

```bash
mkdir -p <account name>/us-east-1/<account name>/data-storage/s3
touch <account name>/us-east-1/<account name>/data-storage/s3/terragrunt.hcl
```

Next, add the terragrunt code to create an S3 bucket. Copy the terragrunt code below, replacing `<your S3 bucket name>` with your desired bucket name. S3 bucket names need to be globally unique, so we've provided a helper script below to help generate the name of your bucket. You may name the bucket whatever you like, just make sure it’s unique.

```bash
export export UNIQUE_ID=$(uuidgen | tr 'A-Z' 'a-z')
export DATE_NOW=$(date "+%F")
echo "gwp-bucket-${UNIQUE_ID}-${DATE_NOW}"
```

```hcl title="<account name>/us-east-1/<account name>/data-storage/s3/terragrunt.hcl"
# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK’s S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/s3-bucket?ref=v0.104.15"
}

include "root" {
  path = find_in_parent_folders()
}

inputs = {
  primary_bucket = "<your S3 bucket name>"
}
```

### Planning and Applying

Create a new branch for your changes, commit your changes to your branch, then push your branch. Next, create a PR to merge your branch into `main` (the default branch in your repository). Follow this GitHub tutorial to [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) using your preferred tool of choice.

After you create the PR, GitHub Actions will automatically run the workflow defined in `pipelines.yml`. Once complete, pipelines will add a comment to the PR with a link to the workflow logs, click the link see the output of the `terragrunt plan` action that ran as a result of your changes.

If the `plan` output looks as expected, you are ready to merge your PR and create the S3 bucket. Click the `Merge pull request` button to merge the pull request. On merge, pipelines will run an `apply` action to provision the S3 bucket. You can find the Workflow run associated with the merged PR by navigating to the `main` branch on your PR and clicking on the Check Run icon at the top of the file explorer, then clicking `details` next to the pipelines workflow. This will take you to the `dispatch` job for pipelines, which contains a link to the workflow run in `infrastructure-pipelines` where you can see the output of your pipelines run.

Congratulations! You've just used Gruntwork Pipelines and a GitOps workflow to provision resources in AWS.

## Wrapping up

Continue using pipelines on your own by adding additional infrastructure units to your environment. Alternatively, create a `_module_defaults` directory and define a module there, then use it in your environment to see how pipelines handles these types of changes.

You also can extend your usage across many AWS accounts by re-running the `infrastructure-live` boilerplate template to create the folder structure for additional accounts (you will need to manually update your `accounts.yml` file with this approach).

## Cleanup (optional)

If you are not going to continue using Pipelines after this tutorial, clean up the resources you created by running `terragrunt run-all destroy` from your account based folder. You may also delete the two repositories created in [Setting up the repositories](#setting-up-the-repositories).
