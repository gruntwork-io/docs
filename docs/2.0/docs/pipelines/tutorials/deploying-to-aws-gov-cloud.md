# Deploying Infrastructure with Gruntwork Pipelines to AWS GovCloud

import CustomizableValue from '/src/components/CustomizableValue';
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

In this tutorial, we will guide you through deploying an AWS S3 bucket to AWS GovCloud using Gruntwork Pipelines.
## What you'll get

By the end of this tutorial, you will have:

- A Gruntwork Pipelines configuration that will deploy an AWS S3 bucket to AWS GovCloud.
- An S3 bucket created in AWS GovCloud deployed automatically using Gruntwork Pipelines.

## Prerequisites

Before starting, ensure you have the following:

- Pipelines installed in a GitHub or GitLab repository. Refer to [Setup & Installation](/2.0/docs/pipelines/installation/overview) for more details.
- Familiarity with Pipelines Configuration as Code (HCL). Refer to the [Configurations as Code](/2.0/reference/pipelines/configurations-as-code) documentation for more details.
- Access to & credentials for a sandbox or development AWS account in the AWS GovCloud partition.
- Permissions to create a pull request/merge request in the GitHub/GitLab repository where Pipelines is installed.
- Boilerplate installed on your development machine. If you have [mise](https://mise.jdx.dev/getting-started.html) installed that is as simple as `mise use boilerplate`, alternatively you can download it from the [release page](https://github.com/gruntwork-io/boilerplate/releases/)

:::info

This tutorial should take approximately 30 minutes to complete.

:::

### Necessary Configuration Values

- <CustomizableValue id="ACCOUNT_NAME"/>: The name of the AWS account to deploy to. This name will be used as the name of the environment in Pipelines configuration, as well as the folder name in your repository that contains the IaC for the account. Gruntwork recommends that the name match the account name in AWS, though that is not strictly required.
- <CustomizableValue id="ACCOUNT_ID"/>: The AWS account ID for the GovCloud AWS account to deploy to.
- <CustomizableValue id="GOVCLOUD_REGION"/>: The GovCloud AWS region to deploy to, typically either `us-gov-west-1` or `us-gov-east-1`.

## Overview

Adding a new GovCloud account to Gruntwork Pipelines, similar to a regular AWS account, requires bootstrapping Pipelines's ability to authenticate with AWS and assume appropriate IAM roles. A key distinction for GovCloud accounts is that the AWS partition is `aws-us-gov` instead of `aws`. This guide will walk you through executing a template to generate Terragrunt code for an OIDC Provider and IAM roles, configured to use the `aws-us-gov` partition, and then plan/applying that code to authorize pipelines.  We'll then create a new S3 bucket in the GovCloud account and verify the bucket was created successfully by Gruntwork Pipelines.

Fundamentally, there are three places where the GovCloud partition must be set:
1. The `aws-us-gov` partition must be present in the ARN for the plan/apply roles configured in [aws_oidc](/2.0/reference/pipelines/configurations-as-code/api#aws_oidc-block-attributes) block for the account, typically in the `.gruntwork/`<CustomizableValue id="ACCOUNT_NAME"/>.hcl file.
2. A valid GovCloud region must be present in the <CustomizableValue id="ACCOUNT_NAME"/>`/_global/region.hcl` file
3. The `aws-us-gov` partition in the plan/apply IAM policies in the <CustomizableValue id="ACCOUNT_NAME"/>`/_global/pipelines-plan-role/terragrunt.hcl` and <CustomizableValue id="ACCOUNT_NAME"/>`/_global/pipelines-apply-role/terragrunt.hcl` files

## Generating Pipelines IAM Configurations

This section covers the Pipelines configuration required to deploy an AWS S3 bucket to AWS GovCloud.

1. Create a `vars.yaml` file on your local machine with the following content:

<Tabs groupId="platform">
<TabItem value="GitHub" label="GitHub" default>
    ```yaml title="vars.yaml"
    AccountName: "$$ACCOUNT_NAME$$"
    AccountId: "$$ACCOUNT_ID$$"
    GitHubOrganization: "$$GITHUB_ORGANIZATION$$"
    GitHubRepository: "$$GITHUB_REPOSITORY$$"
    DeployBranchName: main # Change this to your default branch from which terragrunt apply should be run by pipelines
    DefaultRegion: "$$GOVCLOUD_REGION$$"
    OrgNamePrefix: "$$ORG_NAME_PREFIX$$" # The name prefix to use for creating resources e.g S3 bucket for terraform state files
    AwsPartition: aws-us-gov
    ```

</TabItem>
<TabItem value="GitLab" label="GitLab">
    ```yaml title="vars.yaml"
    AccountName: "$$ACCOUNT_NAME$$"
    AccountId: "$$ACCOUNT_ID$$"
    GitLabGroup: "$$GITLAB_GROUP$$"
    GitLabProject: "$$GITLAB_PROJECT$$"
    DeployBranchName: main # Change this to your default branch from which terragrunt apply should be run by pipelines
    DefaultRegion: "$$GOVCLOUD_REGION$$"
    OrgNamePrefix: "$$ORG_NAME_PREFIX$$" # The name prefix to use for creating resources e.g S3 bucket for terraform state files
    AwsPartition: aws-us-gov

    ```
</TabItem>
</Tabs>

3. We'll now use that `vars.yaml` file as input to [boilerplate](https://github.com/gruntwork-io/boilerplate) to generate the Terragrunt code for the OIDC Provider and IAM roles.  From the root of your repository, run the following command:

<Tabs groupId="platform">
<TabItem value="GitHub" label="GitHub">
```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/github-actions-single-account-setup?ref=X.Y.Z" --output-folder . --var-file vars.yaml --non-interactive
```
</TabItem>
<TabItem value="GitLab" label="GitLab">
```bash
boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/gitlab-pipelines-single-account-setup?ref=X.Y.Z" --output-folder . --var-file vars.yaml --non-interactive
```
</TabItem>
</Tabs>

Boilerplate will generate a handful of files on your filesystem including:

```text
- .gruntwork/$$ACCOUNT_NAME$$.hcl -Pipelines configuration for the account, including the IAM roles to assume to deploy to the account.
- $$ACCOUNT_NAME$$/_global/(scm-host)-oidc-provider/terragrunt.hcl - Terragrunt code for the OIDC Provider.
- $$ACCOUNT_NAME$$/_global/pipelines-plan-role/terragrunt.hcl - Terragrunt code for the plan IAM role
- $$ACCOUNT_NAME$$/_global/pipelines-apply-role/terragrunt.hcl - Terragrunt code for the apply IAM role
- $$ACCOUNT_NAME$$/_global_/region.hcl - Configuration to tell terragrunt what region to use when authenticating with AWS to deploy the global configurations
- $$ACCOUNT_NAME$$/account.hcl - Basic configuration for Terragrunt to inherit when operating in this account
- $$ACCOUNT_NAME$$/tags.yml - tags to apply to all infrastructure deployed to this account
- $$ACCOUNT_NAME$$/$$GOVCLOUD_REGION$$/region.hcl - Configuration to tell terragrunt what region to use when deploying infrastructure from this folder.
```
## Applying the Pipelines IAM Configurations

1. Ensure you have access to the AWS GovCloud account on your local machine
```bash
aws sts get-caller-identity

{
    "UserId": "abcdefg",
    "Account": "$$ACCOUNT_ID$$",
    "Arn": "arn:aws-us-gov:iam::$$ACCOUNT_ID$$:user/MY_USER_NAME"
}
```

2. `cd` into `_global` and run `terragrunt run-all plan`.  This should output a plan to create three resources, the OIDC Provider, the plan IAM role, and the apply IAM role.

3. If the plan looks good, run `terragrunt run-all apply`.  This will create the OIDC Provider, the plan IAM role, and the apply IAM role in your AWS GovCloud account.

:::note

In the event you already have an OIDC provider for your SCM in the AWS account you can import the existing one:

<Tabs groupId="platform">
<TabItem value="GitHub" label="GitHub">
```
cd _global/$$ACCOUNT_NAME$$/github-actions-openid-connect-provider/
terragrunt import "aws_iam_openid_connect_provider.github" "ARN_OF_EXISTING_OIDC_PROVIDER"
```
</TabItem>
<TabItem value="GitLab" label="GitLab">
```
cd _global/$$ACCOUNT_NAME$$/gitlab-pipelines-openid-connect-provider/
terragrunt import "aws_iam_openid_connect_provider.gitlab" "ARN_OF_EXISTING_OIDC_PROVIDER"
```
</TabItem>
</Tabs>

:::

4. Commit all of the rendered files and create a pull request/merge request including the `[skip ci]` tag. Before proceeding to the test steps make sure this PR/MR is approved and merged to main so any future branches have the necessary configuration.

## Testing Pipelines with the newly added GovCloud account

We'll validate pipelines by creating a new S3 bucket in the GovCloud account.

1. Create a new folder in `s3-bucket-test`
```bash
mkdir -p $$ACCOUNT_NAME$$/$$GOVCLOUD_REGION$$/s3-bucket-test/
```

2. Add the following content to the `terragrunt.hcl` file:
```hcl title="$$ACCOUNT_NAME$$/$$GOVCLOUD_REGION$$/s3-bucket-test/terragrunt.hcl"
terraform {
  source = "git::https://github.com/gruntwork-io/terraform-aws-service-catalog.git//.//modules/data-stores/s3-bucket?ref=v0.118.19"
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}

inputs = {
  # --------------------------------------------------------------------------------------------------------------------
  # Required input variables
  # --------------------------------------------------------------------------------------------------------------------

  # Description: What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!
  # Type: string
  primary_bucket = "$$TEST_BUCKET_NAME$$" # TODO: fill in value, ensure it is globally unique

}
```

3. Commit the changes and create a PR/MR and observe pipelines planning/applying the changes.
