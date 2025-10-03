# Bootstrap Pipelines in a New GitLab Repository

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PersistentCheckbox from '/src/components/PersistentCheckbox';

To configure Gruntwork Pipelines in a new GitLab repository, complete the following steps (which are explained in detail below):

1. Create an `infrastructure-live` repository.
2. Configure machine user tokens for GitLab access, or ensure that the appropriate machine user tokens are set up as repository or organization secrets.
3. Create `.gruntwork` HCL configurations to tell Pipelines how to authenticate in your environments.
4. Create `.gitlab-ci.yml` to tell your GitLab CI/CD pipeline how to run your pipelines.
5. Commit and push your changes to your repository.

## Creating the infrastructure-live repository

Creating an `infrastructure-live` repository is fairly straightforward. First, create a new repository using the official GitLab documentation for [creating repositories](https://docs.gitlab.com/user/project/repository/). Name the repository something like `infrastructure-live` and make it private (or internal).

Clone the repository to your local machine using [Git](https://docs.gitlab.com/user/project/repository/index.html#clone-a-repository).

:::tip

If you don't have Git installed, you can install it by following the official guide for [Git installation](https://git-scm.com/downloads).

:::

For example:

```bash
git clone git@gitlab.com:acme/infrastructure-live.git
```

:::note Progress Checklist

<PersistentCheckbox id="clone-repository" label="Clone the repository to your local machine using Git." />

:::

Once the repository is cloned locally, you'll want to create a `.mise.toml` file in the root of the repository to tell Pipelines what versions of Terragrunt and OpenTofu to use.

For example:

```toml title=".mise.toml"
[tools]
terragrunt = "0.88.0"
opentofu = "1.10.6"
```

:::tip

Follow the official [mise installation guide](https://mise.jdx.dev/getting-started.html) to install it locally.

You can get `mise` to lookup the versions available for a given tool by using the `ls-remote` command.

   ```bash
mise ls-remote terragrunt
mise ls-remote opentofu
```

:::

Next, install Terragrunt and OpenTofu locally:

   ```bash
mise install
```

:::note Progress Checklist

<PersistentCheckbox id="create-mise-toml" label="Create a `.mise.toml` file at the root of your repository with the contents above." />
<PersistentCheckbox id="install-terragrunt-and-opentofu" label="Install Terragrunt and OpenTofu locally using `mise install`." />
:::

## Configuring SCM Access

Pipelines needs the ability to interact with Source Control Management (SCM) platforms to fetch resources (e.g. IaC code, reusable CI/CD code and the Pipelines binary itself).

For GitLab, you'll need to configure SCM access using [machine users](/2.0/docs/pipelines/installation/viamachineusers.md#gitlab) with appropriate Personal Access Tokens (PATs).

:::note Progress Checklist

<PersistentCheckbox id="configure-scm-access" label="Configure SCM access for Pipelines using machine users with GitLab PATs." />

:::

## Creating Cloud Resources for Pipelines

To start using Pipelines, you'll need to ensure that requisite cloud resources are provisioned in your cloud provider(s) to start managing your infrastructure with Pipelines.

:::note

If you are using the [Gruntwork Account Factory](/2.0/docs/accountfactory/architecture), this will be done automatically during onboarding and in the process of [vending every new AWS account](/2.0/docs/accountfactory/guides/vend-aws-account), so you don't need to worry about this.

:::

This guide will assume a blank slate, so you can start by creating a new Git repository to track the infrastructure that you're provisioning here.

:::tip

If you don't have Git installed, you can install it by following the official guide for [Git installation](https://git-scm.com/downloads).

:::

<Tabs>
<TabItem value="aws" label="AWS" default>

The resources that you need provisioned in AWS to start managing resources with Pipelines are:

1. An OpenID Connect (OIDC) provider
2. An IAM role for Pipelines to assume when running Terragrunt plan commands
3. An IAM role for Pipelines to assume when running Terragrunt apply commands

For every account you want Pipelines to manage infrastructure in.

:::tip Don't Panic!

This may seem like a lot to set up, but the content you need to add to your `infrastructure-live` repository is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your `infrastructure-live` repository.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the [terragrunt-scale-catalog](https://github.com/gruntwork-io/terragrunt-scale-catalog) repository.

:::

The process that we'll follow to get these resources ready for Pipelines is:

1. Set up these bootstrap resources by creating some Terragrunt configurations in your `infrastructure-live` repository
2. Use Terragrunt to provision these resources in your AWS account

### Bootstrap your `infrastructure-live` repository

To bootstrap your AWS account for use with Pipelines, you'll want to add the following files to your `infrastructure-live` repository:

```hcl title="root.hcl"
locals {
  account_hcl       = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  state_bucket_name = local.account_hcl.locals.state_bucket_name

  region_hcl = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  aws_region = local.region_hcl.locals.aws_region
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket       = local.state_bucket_name
    region       = local.aws_region
    key          = "${path_relative_to_include()}/tofu.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
}
EOF
}
```

:::note Progress Checklist

<PersistentCheckbox id="copy-aws-root-hcl" label="Copy the contents above to a new `root.hcl` file." />

:::

This file is used by all units in your `infrastructure-live` repository to ensure that the OpenTofu modules generated by your Terragrunt units use the appropriate providers and remote state configuration.

```hcl title="name-of-account/account.hcl"
locals {
  // This is the name of the S3 bucket that will be created for state storage.
  //
  // Make sure this is globally unique across all AWS accounts, as S3 bucket names must be globally unique.
  // You will need to change this.
  state_bucket_name = "your-unique-bucket-name-for-state"
}
```

:::note Progress Checklist

<PersistentCheckbox id="create-aws-account-directory" label="Create a new directory for the account you want to bootstrap, named after the account." />
<PersistentCheckbox id="copy-aws-account-hcl-contents" label="Copy the contents above to a new `account.hcl` file in the account directory." />
<PersistentCheckbox id="edit-aws-account-hcl-bucket-name" label="Set the name of the S3 bucket you want to use for state storage in the `account.hcl` file (must be globally unique)." />

:::

This file is used by all units in the `name-of-account` directory to ensure that Terragrunt configurations have access to the information pertinent to the state resources you want to use for your account.

```hcl title="name-of-account/_global/region.hcl"
locals {
  aws_region = "us-east-1"
}
```

:::tip

This region configuration is being set because the AWS API needs to make API calls to _some_ AWS region, but all the resources are, in fact, global.

The AWS IAM service is a global service, which is why we're storing the bootstrap resources in the `_global` directory.

:::

:::note Progress Checklist

<PersistentCheckbox id="create-aws-global-directory" label="Create a new `_global` directory inside your account directory." />
<PersistentCheckbox id="copy-aws-region-hcl-contents" label="Copy the contents above to a new `region.hcl` file in the `_global` directory." />
<PersistentCheckbox id="edit-aws-region-hcl-region" label="Set the AWS region you want to make AWS API calls to." />

:::

This file is used by all units in the `_global` directory to ensure that Terragrunt configurations know which AWS region to use for the OpenTofu AWS provider configuration.

```hcl title="name-of-account/_global/bootstrap/terragrunt.stack.hcl"
locals {
  // Read from parent configurations instead of defining these values locally
  // so that other stacks and units in this directory can reuse the same configurations.
  account_hcl = read_terragrunt_config(find_in_parent_folders("account.hcl"))
}

stack "bootstrap" {
  source = "github.com/gruntwork-io/terragrunt-scale-catalog//stacks/aws/gitlab/pipelines-bootstrap?ref=v1.0.0"
  path   = "bootstrap"

  values = {
    // Set the OIDC resource prefix you want to use for your account.
    //
    // This will be used to determine the names of the OIDC resources like the IAM roles that are created.
    // e.g. `pipelines-plan`, `pipelines-apply`, etc.
    oidc_resource_prefix = "pipelines"

    // Set the GitLab group name you want AWS to trust for OIDC.
    gitlab_group_name = "acme"

    // Set the repository name you want AWS to trust for OIDC.
    gitlab_repo_name = "infrastructure-live"

    // Set the GitLab instance URL (use https://gitlab.com for GitLab.com)
    gitlab_instance_url = "https://gitlab.com"

    // Read from parent configurations instead of defining these values locally.
    state_bucket_name = local.account_hcl.locals.state_bucket_name
  }
}
```

:::note Progress Checklist

<PersistentCheckbox id="create-aws-bootstrap-directory" label="Create a new `bootstrap` directory inside your `_global` directory." />
<PersistentCheckbox id="copy-aws-stack-hcl-contents" label="Copy the contents above to a new `terragrunt.stack.hcl` file in the bootstrap directory." />
<PersistentCheckbox id="set-aws-gitlab-group-name" label="Set the group name in the `terragrunt.stack.hcl` file to the GitLab Group name you want Pipelines to trust." />
<PersistentCheckbox id="set-aws-gitlab-repo-name" label="Set the repository name in the `terragrunt.stack.hcl` file to the name of the repository you want Pipelines to trust." />
<PersistentCheckbox id="set-aws-gitlab-instance-url" label="Set the GitLab instance URL in the `terragrunt.stack.hcl` file (use https://gitlab.com for GitLab.com)." />
<PersistentCheckbox id="double-check-optional-aws-stack-hcl-values" label="Double check that you've set the optional values to your liking." />

:::

You'll also want to make sure that you add the `aws` CLI to your `.mise.toml` file, as you'll be using it to authenticate locally with AWS for the bootstrapping process.

```toml title=".mise.toml"
[tools]
# The Terragrunt and OpenTofu entries should already be present...
awscli = "2.31.6"
```

:::tip

Remember that you can use `ls-remote` to list the available versions of the `awscli` tool.

   ```bash
mise ls-remote awscli
```

:::

Make sure to run `mise install` to install the `awscli` tool.

   ```bash
mise install
   ```

If you haven't already, you'll want to authenticate to AWS using the `aws` CLI.

   ```bash
aws configure
```

:::note Progress Checklist

<PersistentCheckbox id="add-aws-cli-to-mise-toml" label="Add the `awscli` tool to your `.mise.toml` file." />
<PersistentCheckbox id="install-aws-cli" label="Install the `awscli` tool using `mise install`." />
<PersistentCheckbox id="authenticate-with-aws" label="Authenticate with AWS using the `aws` CLI." />
:::

### Provisioning the resources

Once you've set up the Terragrunt configurations, you can use Terragrunt to provision the resources in your AWS account.

First, make sure that everything is set up correctly by running a plan in the bootstrap directory.

```bash title="name-of-account/_global/bootstrap"
terragrunt run --all --non-interactive --provider-cache plan
```

:::tip

We're using the `--provider-cache` flag here to ensure that we don't re-download the AWS provider on every run to speed up the process by leveraging the [Terragrunt Provider Cache Server](https://terragrunt.gruntwork.io/docs/features/provider-cache-server/).

:::

Next, apply the changes to your account.

```bash title="name-of-account/_global/bootstrap"
terragrunt run --all --non-interactive --provider-cache apply
```

:::note Progress Checklist

<PersistentCheckbox id="run-aws-plan" label="Run a plan in the bootstrap directory to make sure that everything is set up correctly." />
<PersistentCheckbox id="run-aws-apply" label="Run an apply in the bootstrap directory to provision the resources in your AWS account." />
:::

:::tip Troubleshooting Tips

If you encounter issues during this step, please refer to the [AWS Initial Apply Failure](#aws-initial-apply-failure) section.

:::

</TabItem>
<TabItem value="azure" label="Azure">

The resources that you need provisioned in Azure to start managing resources with Pipelines are:

1. An Azure Resource Group for OpenTofu state resources
   1. An Azure Storage Account in that resource group for OpenTofu state storage
      1. An Azure Storage Container in that storage account for OpenTofu state storage
2. An Entra ID Application to use for plans
   1. A Flexible Federated Identity Credential for the application to authenticate with your repository on any branch
   2. A Service Principal for the application to be used in role assignments
      1. A role assignment for the service principal to access the Azure subscription
      2. A role assignment for the service principal to access the Azure Storage Account
3. An Entra ID Application to use for applies
   1. A Federated Identity Credential for the application to authenticate with your repository on the deploy branch
   2. A Service Principal for the application to be used in role assignments
      1. A role assignment for the service principal to access the Azure subscription

:::tip Don't Panic!

This may seem like a lot to set up, but the content you need to add to your `infrastructure-live` repository is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your `infrastructure-live` repository.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the [terragrunt-scale-catalog](https://github.com/gruntwork-io/terragrunt-scale-catalog) repository.

:::

The process that we'll follow to get these resources ready for Pipelines is:

1. Set up these bootstrap resources by creating some Terragrunt configurations in your `infrastructure-live` repository
2. Use Terragrunt to provision these resources in your Azure subscription
3. Pull the bootstrap resources into state, using the storage account we just provisioned

### Bootstrap your Azure `infrastructure-live` repository

To bootstrap your Azure subscription for use with Pipelines, you'll want to add the following files to your `infrastructure-live` repository:

```hcl title="root.hcl"
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "azurerm" {
  features {}

  resource_provider_registrations = "none"
}

provider "azuread" {}
EOF
}
```

:::note Progress Checklist

<PersistentCheckbox id="copy-root-hcl" label="Copy the contents above to a new `root.hcl` file." />

:::

This file is used by all units in your `infrastructure-live` repository to ensure that the OpenTofu modules generated by your Terragrunt units use the appropriate providers.

```hcl title="name-of-subscription/sub.hcl"
locals {
  // This is the name of the resource group that will be created for state storage.
  //
  // You don't need to change this if you don't want to (and you don't already have a resource group named this).
  state_resource_group_name = "pipelines-rg"

  // Make sure this is less than 24 characters, and only contains lowercase letters and numbers
  // to obey Azure's naming requirements.
  //
  // You will need to change this.
  state_storage_account_name = "name-of-storage-account-you-want-to-use-for-state"

  // This is the name of the container you'll use for state storage.
  //
  // You don't need to change this if you don't want to.
  state_storage_container_name = "tfstate"
}
```

:::note Progress Checklist

<PersistentCheckbox id="create-subscription-directory" label="Create a new directory for the subscription you want to bootstrap, named after the subscription." />
<PersistentCheckbox id="copy-sub-hcl-contents" label="Copy the contents above to a new `sub.hcl` file in the subscription directory." />
<PersistentCheckbox id="edit-sub-hcl-storage-account-name" label="Set the name of the storage account you want to use for state storage in the `sub.hcl` file." />
<PersistentCheckbox id="double-check-optional-sub-hcl-values" label="Double check that you've set the optional values to your liking." />

:::

This file is used by all units in the `name-of-subscription` directory to ensure that Terragrunt configurations have access to the information pertinent to the state resources you want to use for your subscription.

```hcl title="name-of-subscription/bootstrap/terragrunt.stack.hcl"
locals {
  // Read from parent configurations instead of defining these values locally
  // so that other stacks and units in this directory can reuse the same configurations.
  sub_hcl = read_terragrunt_config(find_in_parent_folders("sub.hcl"))
}

stack "bootstrap" {
  source = "github.com/gruntwork-io/terragrunt-scale-catalog//stacks/azure/gitlab/pipelines-bootstrap?ref=v1.0.0"
  path   = "bootstrap"

  values = {
    // Set the location to the location you want to bootstrap your subscription in.
    location = "East US"

    // Read from parent configurations instead of defining these values locally.
    state_resource_group_name    = local.sub_hcl.locals.state_resource_group_name
    state_storage_account_name   = local.sub_hcl.locals.state_storage_account_name
    state_storage_container_name = local.sub_hcl.locals.state_storage_container_name

    // Set the GitLab group name you want Azure to trust for OIDC.
    gitlab_group_name = "acme"

    // Set the repository name you want Azure to trust for OIDC.
    gitlab_repo_name = "infrastructure-live"

    // Set the GitLab instance URL (use https://gitlab.com for GitLab.com)
    gitlab_instance_url = "https://gitlab.com"

    // Set the OIDC resource prefix you want to use for your subscription.
    //
    // This will be used to determine the names of the OIDC resources like the Entra ID Applications that are created.
    // e.g. `pipelines`-plan, `pipelines`-apply, etc.
    oidc_resource_prefix = "pipelines"
  }
}
```

:::note Progress Checklist

<PersistentCheckbox id="copy-stack-hcl-contents" label="Copy the contents above to a new `terragrunt.stack.hcl` file in the subscription directory." />
<PersistentCheckbox id="set-location" label="Set the location in the `terragrunt.stack.hcl` file to the location you want to bootstrap your subscription in." />
<PersistentCheckbox id="set-gitlab-group-name" label="Set the group name in the `terragrunt.stack.hcl` file to the GitLab Group name you want Pipelines to trust." />
<PersistentCheckbox id="set-gitlab-repo-name" label="Set the repository name in the `terragrunt.stack.hcl` file to the name of the repository you want Pipelines to trust." />
<PersistentCheckbox id="set-gitlab-instance-url" label="Set the GitLab instance URL in the `terragrunt.stack.hcl` file (use https://gitlab.com for GitLab.com)." />
<PersistentCheckbox id="double-check-optional-stack-hcl-values" label="Double check that you've set the optional values to your liking." />

:::

You'll also want to make sure that you add the `azure` CLI to your `.mise.toml` file, as you'll be using it to authenticate locally with Azure for the bootstrapping process.

```toml title=".mise.toml"
[tools]
# The Terragrunt and OpenTofu entries should already be present...
azure-cli = "2.77.0"
```

:::tip

Remember that you can use `ls-remote` to list the available versions of the `azure-cli` tool.

   ```bash
mise ls-remote azure-cli
   ```

:::

Make sure to run `mise install` to install the `azure-cli` tool.

   ```bash
mise install
   ```

If you haven't already, you'll want to authenticate to Azure using the `az` CLI.

   ```bash
az login
```

:::note Progress Checklist

<PersistentCheckbox id="add-azure-cli-to-mise-toml" label="Add the `azure-cli` tool to your `.mise.toml` file." />
<PersistentCheckbox id="install-azure-cli" label="Install the `azure-cli` tool using `mise install`." />
<PersistentCheckbox id="authenticate-with-azure" label="Authenticate with Azure using the `az` CLI." />
:::

### Provisioning the Azure resources

Once you've set up the Terragrunt configurations, you can use Terragrunt to provision the resources in your Azure subscription.

To dynamically configure the Azure provider with a given tenant ID and subscription ID, ensure that you are exporting the following environment variables if you haven't the values via the `az` CLI:

- `ARM_TENANT_ID`
- `ARM_SUBSCRIPTION_ID`

For example:

   ```bash
export ARM_TENANT_ID="00000000-0000-0000-0000-000000000000"
export ARM_SUBSCRIPTION_ID="11111111-1111-1111-1111-111111111111"
```

:::note Progress Checklist

<PersistentCheckbox id="export-arm-tenant-id" label="Export the ARM_TENANT_ID environment variable with the tenant ID of the Azure subscription you want to provision resources in." />
<PersistentCheckbox id="export-arm-subscription-id" label="Export the ARM_SUBSCRIPTION_ID environment variable with the subscription ID of the Azure subscription you want to provision resources in." />
:::

First, make sure that everything is set up correctly by running a plan in the subscription directory.

```bash title="name-of-subscription"
terragrunt run --all --non-interactive --provider-cache plan
```

:::tip

We're using the `--provider-cache` flag here to ensure that we don't re-download the Azure provider on every run to speed up the process.

:::

Next, apply the changes to your subscription.

```bash title="name-of-subscription"
terragrunt run --all --non-interactive --provider-cache --no-stack-generate apply
```

:::tip

We're adding the `--no-stack-generate` flag here, as Terragrunt will already have the requisite stack configurations generated, and we don't want to accidentally overwrite any configurations while we have state stored locally before we pull them into remote state.

:::

:::note Progress Checklist

<PersistentCheckbox id="run-plan" label="Run a plan in the subscription directory to make sure that everything is set up correctly." />
<PersistentCheckbox id="run-apply" label="Run an apply in the subscription directory to provision the resources in your Azure subscription." />
:::

:::tip Troubleshooting Tips

If you encounter issues during this step, please refer to the [Initial Apply Failure](#azure-initial-apply-failure) section.

:::

### Pulling the resources into state

Once you've provisioned the resources in your Azure subscription, you can pull the resources into state using the storage account we just provisioned.

```bash title="name-of-subscription"
terragrunt run --all --non-interactive --provider-cache --no-stack-generate -- init -migrate-state -force-copy
```

:::tip

We're adding the `-force-copy` flag here to avoid any issues with OpenTofu waiting for an interactive prompt to copy up local state.

:::

:::note Progress Checklist

<PersistentCheckbox id="run-init-migrate-state-force-copy" label="Pull the resources into state using Terragrunt." />

:::

</TabItem>
</Tabs>

## Creating `.gruntwork` HCL configurations

Create [HCL configurations](/2.0/reference/pipelines/configurations-as-code/) in the `.gruntwork` directory in the root of your `infrastructure-live` repository to tell Pipelines how you plan to organize your infrastructure, and how you plan to have Pipelines authenticate with your cloud provider(s).

### The `repository` block

The core configuration that you'll want to start with is the `repository` block. This block tells Pipelines which branch has the "live" infrastructure you want provisioned. When you merge IaC to this branch, Pipelines will be triggered to update your infrastructure accordingly.

```hcl title=".gruntwork/repository.hcl"
repository {
  deploy_branch_name = "main"
}
```

:::note Progress Checklist

<PersistentCheckbox id="create-repository-hcl" label="Create a new `.gruntwork/repository.hcl` file in the root of your `infrastructure-live` repository with the contents above." />
<PersistentCheckbox id="edit-repository-deploy-branch-name" label="Edit the value of `deploy_branch_name` in `.gruntwork/repository.hcl` if necessary." />

:::

### The `environment` block

Next, you'll want to define the environments you want to manage with Pipelines using the [`environment` block](/2.0/reference/pipelines/configurations-as-code/api#environment-block).

For each environment, you'll want to define a [`filter` block](/2.0/reference/pipelines/configurations-as-code/api#filter-block) that tells Pipelines which units are part of that environment. You'll also want to define an [`authentication` block](/2.0/reference/pipelines/configurations-as-code/api#authentication-block) that tells Pipelines how to authenticate with your cloud provider(s) for that environment.

<Tabs>
<TabItem value="aws" label="AWS" default>

```hcl title=".gruntwork/environment-an-aws-account.hcl"
environment "an_aws_account" {
  filter {
    paths = ["an-aws-account/*"]
  }

  authentication {
    aws_oidc {
      account_id = "123456789012"
      plan_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-apply"
    }
  }
}
```

:::tip

Learn more about how Pipelines authenticates to AWS in the [Authenticating to AWS](/2.0/docs/pipelines/concepts/cloud-auth/aws) page.

:::

:::tip

Check out the [aws block](/2.0/reference/pipelines/configurations-as-code/#aws-blocks) for more information on how to configure Pipelines to authenticate with AWS conveniently.

:::

:::note Progress Checklist

<PersistentCheckbox id="create-aws-environment-hcl" label="Create a new `.gruntwork/environment-an-aws-account.hcl` file in the root of your `infrastructure-live` repository with the contents above." />
<PersistentCheckbox id="rename-aws-environment-hcl" label="Rename the file to match the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-aws-environment-label" label="Edit the label of the `environment` block from `an_aws_account` to the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-aws-filter-paths" label="Edit the value of `paths` in the `filter` block so that the glob matches the path to the units you want to manage with Pipelines as part of that environment." />
<PersistentCheckbox id="edit-aws-account-id" label="Edit the value of `account_id` in the `aws_oidc` block so that it matches the AWS account ID of the account you want to authenticate with." />
<PersistentCheckbox id="edit-aws-plan-iam-role-arn" label="Edit the value of `plan_iam_role_arn` and `apply_iam_role_arn` in the `aws_oidc` block so that they match the IAM roles you want to assume for plans and applies for that environment." />

:::

</TabItem>
<TabItem value="azure" label="Azure">

```hcl title=".gruntwork/environment-an-azure-subscription.hcl"
environment "an_azure_subscription" {
  filter {
    paths = ["an-azure-subscription/*"]
  }

  authentication {
    azure_oidc {
      tenant_id       = "00000000-0000-0000-0000-000000000000"
      subscription_id = "11111111-1111-1111-1111-111111111111"

      plan_client_id  = "33333333-3333-3333-3333-333333333333"
      apply_client_id = "44444444-4444-4444-4444-444444444444"
    }
  }
}
```

:::tip

Learn more about how Pipelines authenticates to Azure in the [Authenticating to Azure](/2.0/docs/pipelines/concepts/cloud-auth/azure) page.

:::

:::note Progress Checklist

<PersistentCheckbox id="create-azure-environment-hcl" label="Create a new `.gruntwork/environment-an-azure-subscription.hcl` file in the root of your `infrastructure-live` repository with the contents above." />
<PersistentCheckbox id="rename-azure-environment-hcl" label="Rename the file to match the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-azure-environment-label" label="Edit the label of the `environment` block from `an_azure_subscription` to the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-azure-filter-paths" label="Edit the value of `paths` in the `filter` block so that the glob matches the path to the units you want to manage with Pipelines as part of that environment." />
<PersistentCheckbox id="edit-azure-tenant-id" label="Edit the value of `tenant_id` in the `azure_oidc` block so that it matches the tenant ID of the tenant you want to authenticate with." />
<PersistentCheckbox id="edit-azure-subscription-id" label="Edit the value of `subscription_id` in the `azure_oidc` block so that it matches the subscription ID of the subscription you want to authenticate with." />
<PersistentCheckbox id="edit-azure-plan-client-id" label="Edit the value of `plan_client_id` in the `azure_oidc` block so that it matches the client ID you want to authenticate with for plans." />
<PersistentCheckbox id="edit-azure-apply-client-id" label="Edit the value of `apply_client_id` in the `azure_oidc` block so that it matches the client ID you want to authenticate with for applies." />

:::

</TabItem>
<TabItem value="custom" label="Custom">

```hcl title=".gruntwork/environment-dev.hcl"
environment "dev" {
  filter {
    paths = ["dev/*"]
  }

  authentication {
    custom {
      auth_provider_cmd = "./scripts/custom-auth-dev.sh"
    }
  }
}
```

:::tip

Learn more about how Pipelines can authenticate with custom authentication in the [Custom Authentication](/2.0/docs/pipelines/concepts/cloud-auth/custom) page.

:::

:::note Progress Checklist

<PersistentCheckbox id="create-custom-authentication-environment" label="Create a new `.gruntwork/environment-dev.hcl` file in the root of your `infrastructure-live` repository with the contents above." />
<PersistentCheckbox id="rename-custom-authentication-environment" label="Rename the file to match the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-custom-authentication-environment-label" label="Edit the label of the `environment` block from `dev` to the name of the environment you want to manage with pipelines." />
<PersistentCheckbox id="edit-custom-authentication-filter-paths" label="Edit the value of `paths` in the `filter` block so that the glob matches the path to the units you want to manage with Pipelines as part of that environment." />
<PersistentCheckbox id="create-custom-authentication-script" label="Create a new `scripts/custom-auth-dev.sh` file (or name it something else) in the root of your `infrastructure-live` repository that performs the authentication you want to use for that environment (see the link above for help with this)." />
<PersistentCheckbox id="edit-custom-authentication-auth-provider-cmd" label="Edit the value of `auth_provider_cmd` in the `custom` block so that it matches the path to the script you want to use to authenticate with." />

:::

</TabItem>
</Tabs>

## Creating `.gitlab-ci.yml`

Create a `.gitlab-ci.yml` file in the root of your `infrastructure-live` repository with the following content:

```yaml title=".gitlab-ci.yml"
include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/gitlab-ci@v4
    inputs:
      stage: pipelines
```

:::info

**For custom GitLab instances only**: If you are using a custom GitLab instance, you must update the component reference to point to your forked version of the pipelines-workflows project:

```yaml title=".gitlab-ci.yml"
include:
  - component: your-gitlab-instance.com/your-group/pipelines-workflows/gitlab-ci@v4
    inputs:
      stage: pipelines
```

:::

:::tip

You can read the [Pipelines GitLab CI Component](https://gitlab.com/gruntwork-io/pipelines-workflows/-/blob/main/templates/gitlab-ci.yml) to learn how this GitLab CI component calls the Pipelines CLI to run your pipelines.

:::

:::note Progress Checklist

<PersistentCheckbox id="create-gitlab-ci-yml" label="Create a new `.gitlab-ci.yml` file in the root of your `infrastructure-live` repository with the contents above." />
<PersistentCheckbox id="update-gitlab-ci-component-reference" label="If using a custom GitLab instance, update the component reference to point to your forked pipelines-workflows project." />

:::

## Commit and push your changes

Commit and push your changes to your repository.

   :::note

You should include `[skip ci]` in your commit message here to prevent triggering the Pipelines workflow.

:::

```bash
git add .
git commit -m "Add Pipelines GitLab CI workflow [skip ci]"
git push
```

:::note Progress Checklist

<PersistentCheckbox id="commit-and-push-changes" label="Commit the changes to your repository (using `[skip ci]` in the commit message)." />
<PersistentCheckbox id="push-changes-to-repository" label="Push the changes to your repository." />

:::

🚀 You've successfully added Gruntwork Pipelines to your new repository!

## Next steps

You have successfully completed the installation of Gruntwork Pipelines in a new repository. Proceed to [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change.md) to begin deploying changes.

## Troubleshooting Tips

If you encounter one of the following issues, please refer to the troubleshooting guidance for each scenario.

### AWS Initial Apply Failure

If your initial apply fails, follow these steps to troubleshoot the issue:

<PersistentCheckbox id="aws-initial-apply-failure-check-terragrunt-apply-command" label="Confirm that you ran the terragrunt apply command with all the required flags: `terragrunt run --all --non-interactive apply`" />
<PersistentCheckbox id="aws-initial-apply-failure-check-aws-credentials" label="Confirm that you have the correct AWS credentials and permissions to create resources in your account" />
<PersistentCheckbox id="aws-initial-apply-failure-check-aws-region" label="Confirm that your AWS region in region.hcl matches an actual AWS region name (e.g. 'us-east-1', not 'us-east-1a')" />
<PersistentCheckbox id="aws-initial-apply-failure-check-bucket-name" label="Confirm that your S3 bucket name in account.hcl is globally unique across all of AWS and follows naming requirements (lowercase letters, numbers, and hyphens only)" />
<PersistentCheckbox id="aws-initial-apply-failure-check-gitlab-group-repo" label="Ensure your GitLab group and repository names in terragrunt.stack.hcl match your actual GitLab group and repository" />
<PersistentCheckbox id="aws-initial-apply-failure-check-gitlab-instance-url" label="Ensure your GitLab instance URL in terragrunt.stack.hcl is correct (use https://gitlab.com for GitLab.com)" />

### Azure Initial Apply Failure

If your initial apply fails, follow these steps to troubleshoot the issue:

<PersistentCheckbox id="azure-initial-apply-failure-check-terragrunt-apply-command" label="Confirm that you ran the terragrunt apply command with all the required flags: `terragrunt run --all --non-interactive --provider-cache --no-stack-generate apply`" />
<PersistentCheckbox id="azure-initial-apply-failure-check-azure-credentials" label="Confirm that you have the correct Azure credentials and permissions to create resources in your subscription" />
<PersistentCheckbox id="azure-initial-apply-failure-check-arm-tenant-id" label="Confirm that you have exported the ARM_TENANT_ID and ARM_SUBSCRIPTION_ID environment variables if you haven't set them via the `az` CLI" />
<PersistentCheckbox id="azure-initial-apply-failure-check-storage-account-name" label="Confirm that your storage account name in sub.hcl is unique across all of Azure and follows naming requirements (less than 24 chars, lowercase letters and numbers only)" />
<PersistentCheckbox id="azure-initial-apply-failure-check-location" label="Ensure your location value in terragrunt.stack.hcl matches an actual Azure region name (e.g. 'East US', not 'eastus')" />
<PersistentCheckbox id="azure-initial-apply-failure-check-gitlab-group-repo" label="Ensure your GitLab group and repository names in terragrunt.stack.hcl match your actual GitLab group and repository" />
<PersistentCheckbox id="azure-initial-apply-failure-check-gitlab-instance-url" label="Ensure your GitLab instance URL in terragrunt.stack.hcl is correct (use https://gitlab.com for GitLab.com)" />

### GitLab CI/CD Issues

If you encounter issues with GitLab CI/CD:

<PersistentCheckbox id="gitlab-ci-check-machine-user-tokens" label="Ensure that PIPELINES_GITLAB_TOKEN and PIPELINES_GITLAB_READ_TOKEN are set as CI/CD variables in your group or project" />
<PersistentCheckbox id="gitlab-ci-check-token-permissions" label="Verify that the machine user tokens have the correct permissions and are not marked as protected" />
<PersistentCheckbox id="gitlab-ci-check-component-reference" label="For custom GitLab instances, verify that the component reference in .gitlab-ci.yml points to your forked pipelines-workflows project" />
<PersistentCheckbox id="gitlab-ci-check-group-authorization" label="Confirm your GitLab group has been authorized by Gruntwork for Pipelines usage" />
