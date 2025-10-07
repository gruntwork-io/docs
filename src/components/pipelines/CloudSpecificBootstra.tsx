import React from "react";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import PersistentCheckbox from '../PersistentCheckbox';

export const CloudSpecificBootstrap = () => {
  return (
    <>
<Tabs groupId="cloud-provider">
<TabItem value="aws" label="AWS" default>

The resources you need provisioned in AWS to start managing resources with Pipelines are:

1. An OpenID Connect (OIDC) provider
2. An IAM role for Pipelines to assume when running Terragrunt plan commands
3. An IAM role for Pipelines to assume when running Terragrunt apply commands

For every account you want Pipelines to manage infrastructure in.

:::tip Don't Panic!

This may seem like a lot to set up, but the content you need to add to your project is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your project.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the [terragrunt-scale-catalog](https://github.com/gruntwork-io/terragrunt-scale-catalog) repository.

:::

The process that we'll follow to get these resources ready for Pipelines is:

1. Use Boilerplate to scaffold bootstrap configurations in your project for each AWS account
2. Use Terragrunt to provision these resources in your AWS accounts
3. (Optionally) Bootstrap additional AWS accounts until all your AWS accounts are ready for Pipelines

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Bootstrap Your Project for AWS</h3>

First, confirm that you have a `root.hcl` file in the root of your project that looks something like this:

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

If you don't have a `root.hcl` file, you might need to customize the bootstrapping process, as the Terragrunt scale catalog expects a `root.hcl` file in the root of the project. Please contact [Gruntwork support](/support) for assistance if you need help.

For each AWS account that needs bootstrapping, we'll use Boilerplate to scaffold the necessary content. Run this command from the root of your project for each account:

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/gitlab/account?ref=v1.0.0' \
  --output-folder .
```

:::tip

You'll need to run this boilerplate command once for each AWS account you want to manage with Pipelines. Boilerplate will prompt you for account-specific values each time.

:::

:::tip

You can reply `y` to all the prompts to include dependencies, and accept defaults unless you want to customize something.

Alternatively, you could run Boilerplate non-interactively by passing the `--non-interactive` flag. You'll need to supply the relevant values for required variables in that case.

e.g.

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/gitlab/account?ref=v1.0.0' \
  --output-folder . \
  --var 'AccountName=dev' \
  --var 'GitLabGroupName=acme' \
  --var 'GitLabRepoName=infrastructure-live' \
  --var 'GitLabInstanceURL=https://gitlab.com' \
  --var 'AWSAccountID=123456789012' \
  --var 'AWSRegion=us-east-1' \
  --var 'StateBucketName=my-state-bucket' \
  --non-interactive
```

If you're using a self-hosted GitLab instance, you'll want to make sure the issuer is set correctly when calling Boilerplate.

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/gitlab/account?ref=v1.0.0' \
  --output-folder . \
  --var 'AccountName=dev' \
  --var 'GitLabGroupName=acme' \
  --var 'GitLabRepoName=infrastructure-live' \
  --var 'GitLabInstanceURL=https://gitlab.com' \
  --var 'AWSAccountID=123456789012' \
  --var 'AWSRegion=us-east-1' \
  --var 'StateBucketName=my-state-bucket' \
  --var 'Issuer=$$ISSUER_URL$$' \
  --non-interactive
```

You can also choose to store these values in a YAML file and pass it to Boilerplate using the `--var-file` flag.

```yaml title="vars.yml"
AccountName: dev
GitLabGroupName: acme
GitLabRepoName: infrastructure-live
GitLabInstanceURL: https://gitlab.com
AWSAccountID: 123456789012
AWSRegion: us-east-1
StateBucketName: my-state-bucket
```

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/gitlab/account?ref=v1.0.0' \
  --output-folder . \
  --var-file vars.yml \
  --non-interactive
```

:::

:::note Progress Checklist

<PersistentCheckbox id="scaffold-aws-account" label="Use Boilerplate to scaffold out your project with the necessary bootstrap configurations for each AWS account." />

:::

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Provision AWS Bootstrap Resources</h3>

Once you've scaffolded out the accounts you want to bootstrap, you can use Terragrunt to provision the resources in each of these accounts.

:::tip

Make sure that you authenticate to each AWS account you are bootstrapping using AWS credentials for that account before you attempt to provision resources in it.

You can follow the documentation [here](https://search.opentofu.org/provider/hashicorp/aws/latest#authentication-and-configuration) to authenticate with the AWS provider. You are advised to choose an authentication method that doesn't require any hard-coded credentials, like assuming an IAM role.

:::

For each account you want to bootstrap, you'll need to run the following commands:

First, make sure that everything is set up correctly by running a plan in the `bootstrap` directory in `name-of-account/_global` where `name-of-account` is the name of the AWS account you want to bootstrap.

```bash title="name-of-account/_global/bootstrap"
terragrunt run --all --non-interactive --provider-cache plan
```

:::tip

We're using the `--provider-cache` flag here to ensure that we don't re-download the AWS provider on every run by leveraging the [Terragrunt Provider Cache Server](https://terragrunt.gruntwork.io/docs/features/provider-cache-server/).

:::

Next, apply the changes to your account.

```bash title="name-of-account/_global/bootstrap"
terragrunt run --all --non-interactive --provider-cache apply
```

:::note Progress Checklist

<PersistentCheckbox id="run-aws-plan" label="Run a plan in the bootstrap directory to make sure that everything is set up correctly." />
<PersistentCheckbox id="run-aws-apply" label="Run an apply in the bootstrap directory to provision the resources in your AWS account." />

:::

</TabItem>
<TabItem value="azure" label="Azure">

The resources you need provisioned in Azure to start managing resources with Pipelines are:

1. An Azure Resource Group for OpenTofu state resources
   1. An Azure Storage Account in that resource group for OpenTofu state storage
      1. An Azure Storage Container in that storage account for OpenTofu state storage
2. An Entra ID Application to use for plans
   1. A Flexible Federated Identity Credential for the application to authenticate with your project on any branch
   2. A Service Principal for the application to be used in role assignments
      1. A role assignment for the service principal to access the Azure subscription
      2. A role assignment for the service principal to access the Azure Storage Account
3. An Entra ID Application to use for applies
   1. A Federated Identity Credential for the application to authenticate with your project on the deploy branch
   2. A Service Principal for the application to be used in role assignments
      1. A role assignment for the service principal to access the Azure subscription

:::tip Don't Panic!

This may seem like a lot to set up, but the content you need to add to your project is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your project.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the [terragrunt-scale-catalog](https://github.com/gruntwork-io/terragrunt-scale-catalog) repository.

:::

The process that we'll follow to get these resources ready for Pipelines is:

1. Use Boilerplate to scaffold bootstrap configurations in your project for each Azure subscription
2. Use Terragrunt to provision these resources in your Azure subscription
3. Finalizing Terragrunt configurations using the bootstrap resources we just provisioned
4. Pull the bootstrap resources into state, now that we have configured a remote state backend
5. (Optionally) Bootstrap additional Azure subscriptions until all your Azure subscriptions are ready for Pipelines

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Bootstrap Your Project for Azure</h3>

For each Azure subscription that needs bootstrapping, we'll use Boilerplate to scaffold the necessary content. Run this command from the root of your project for each subscription:

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/azure/gitlab/subscription?ref=v1.0.0' \
  --output-folder .
```

:::tip

You'll need to run this boilerplate command once for each Azure subscription you want to manage with Pipelines. Boilerplate will prompt you for subscription-specific values each time.

:::

:::tip

You can reply `y` to all the prompts to include dependencies, and accept defaults unless you want to customize something.

Alternatively, you could run Boilerplate non-interactively by passing the `--non-interactive` flag. You'll need to supply the relevant values for required variables in that case.

e.g.

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/azure/gitlab/subscription?ref=v1.0.0' \
  --output-folder . \
  --var 'AccountName=dev' \
  --var 'GitLabGroupName=acme' \
  --var 'GitLabRepoName=infrastructure-live' \
  --var 'GitLabInstanceURL=https://gitlab.com' \
  --var 'SubscriptionName=dev' \
  --var 'AzureTenantID=00000000-0000-0000-0000-000000000000' \
  --var 'AzureSubscriptionID=11111111-1111-1111-1111-111111111111' \
  --var 'AzureLocation=East US' \
  --var 'StateResourceGroupName=pipelines-rg' \
  --var 'StateStorageAccountName=mysa' \
  --var 'StateStorageContainerName=tfstate' \
  --non-interactive
```

You can also choose to store these values in a YAML file and pass it to Boilerplate using the `--var-file` flag.

```yaml title="vars.yml"
AccountName: dev
GitLabGroupName: acme
GitLabRepoName: infrastructure-live
GitLabInstanceURL: https://gitlab.com
SubscriptionName: dev
AzureTenantID: 00000000-0000-0000-0000-000000000000
AzureSubscriptionID: 11111111-1111-1111-1111-111111111111
AzureLocation: East US
StateResourceGroupName: pipelines-rg
StateStorageAccountName: my-storage-account
StateStorageContainerName: tfstate
```

```bash
boilerplate \
  --template-url 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/azure/gitlab/subscription?ref=v1.0.0' \
  --output-folder . \
  --var-file vars.yml \
  --non-interactive
```

:::

:::note Progress Checklist

<PersistentCheckbox id="scaffold-azure-subscription" label="Use Boilerplate to scaffold out your project with the necessary bootstrap configurations for each Azure subscription." />

:::

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Provision Azure Bootstrap Resources</h3>

Once you've scaffolded out the subscriptions you want to bootstrap, you can use Terragrunt to provision the resources in your Azure subscription.

If you haven't already, you'll want to authenticate to Azure using the `az` CLI.

```bash
az login
```

:::note Progress Checklist

<PersistentCheckbox id="authenticate-with-azure" label="Authenticate with Azure using the `az` CLI." />

:::


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

We're using the `--provider-cache` flag here to ensure that we don't re-download the Azure provider on every run to speed up the process by leveraging the [Terragrunt Provider Cache Server](https://terragrunt.gruntwork.io/docs/features/provider-cache-server/).

:::

:::note Progress Checklist

<PersistentCheckbox id="run-azure-plan" label="Run a plan in the subscription directory to make sure that everything is set up correctly." />

:::

Next, apply the changes to your subscription.

```bash title="name-of-subscription"
terragrunt run --all --non-interactive --provider-cache --no-stack-generate apply
```

:::tip

We're adding the `--no-stack-generate` flag here, as Terragrunt will already have the requisite stack configurations generated, and we don't want to accidentally overwrite any configurations while we have state stored locally before we pull them into remote state.

:::

:::note Progress Checklist

<PersistentCheckbox id="run-azure-apply" label="Run an apply in the subscription directory to provision the resources in your Azure subscription." />
:::

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Finalizing Terragrunt configurations</h3>

Once you've provisioned the resources in your Azure subscription, you can finalize the Terragrunt configurations using the bootstrap resources we just provisioned.

First, edit the `root.hcl` file in the root of your project to leverage the storage account we just provisioned.

If your `root.hcl` file doesn't already have a remote state backend configuration, you'll need to add one that looks like this:

```hcl title="root.hcl"
locals {
  sub_hcl = read_terragrunt_config(find_in_parent_folders("sub.hcl"))

  state_resource_group_name    = local.sub_hcl.locals.state_resource_group_name
  state_storage_account_name   = local.sub_hcl.locals.state_storage_account_name
  state_storage_container_name = local.sub_hcl.locals.state_storage_container_name
}

remote_state {
  backend = "azurerm"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    resource_group_name  = local.state_resource_group_name
    storage_account_name = local.state_storage_account_name
    container_name       = local.state_storage_container_name
    key                  = "${path_relative_to_include()}/tofu.tfstate"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
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

<PersistentCheckbox id="add-remote-state-backend" label="Add or uncomment the section that defines the remote state backend in the `root.hcl` file." />

:::

Next, finalize the `.gruntwork/environment-<name-of-subscription>.hcl` file in the root of your project to reference the IDs for the applications we just provisioned.

You can find the values for the `plan_client_id` and `apply_client_id` by running `terragrunt stack output` in the `bootstrap` directory in `name-of-subscription/bootstrap`.

```bash
terragrunt stack output
```

The relevant bits that you want to extract from the stack output are the following:

```hcl
bootstrap = {
  apply_app = {
    client_id = "33333333-3333-3333-3333-333333333333"
  }
  plan_app = {
    client_id = "44444444-4444-4444-4444-444444444444"
  }
}
```

You can use those values to set the values for `plan_client_id` and `apply_client_id` in the `.gruntwork/environment-<name-of-subscription>.hcl` file.

:::note Progress Checklist

<PersistentCheckbox id="fill-in-plan-client-id" label="Fill in `plan_client_id` after bootstrapping." />
<PersistentCheckbox id="fill-in-apply-client-id" label="Fill in `apply_client_id` after bootstrapping." />

:::

{/* We're using an h3 tag here instead of a markdown heading to avoid adding content to the ToC that won't work when switching between tabs */}
<h3>Pulling the resources into state</h3>

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
</>
);
}
