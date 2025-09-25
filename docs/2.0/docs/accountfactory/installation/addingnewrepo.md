# Adding Account Factory to a new repository

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To configure Gruntwork Pipelines in a new GitHub repository, complete the following steps (which are explained in detail below):

1. Create an `infrastructure-live` repository.
2. Configure the Gruntwork.io GitHub App to authorize your `infrastructure-live` repository, or ensure that the appropriate machine user tokens are set up as repository or organization secrets.
3. Create `.gruntwork` HCL configurations to tell Pipelines how to authenticate in your environments.
4. Create `.github/workflows/pipelines.yml` to tell your GitHub Actions workflow how to run your pipelines.
5. Commit and push your changes to your repository.

## Creating the infrastructure-live repository

Creating an `infrastructure-live` repository is fairly straightforward. First, create a new repository using the official GitHub documentation for [creating repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). Name the repository something like `infrastructure-live` and make it private (or internal).

Clone the repository to your local machine using [Git](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

:::tip

If you don't have Git installed, you can install it by following the official guide for [Git installation](https://git-scm.com/downloads).

To configure Gruntwork Account Factory in a new GitHub repository, the following steps are required (and will be explained in detail below):

1. Create your `infrastructure-live-root` repository using Gruntwork's GitHub template.
2. Configure the Gruntwork.io GitHub App to authorize your `infrastructure-live-root` repository, or ensure that the appropriate machine user tokens are set up as repository or organization secrets.
3. Update the Bootstrap Workflow to configure your AWS settings.
4. Execute the Bootstrap Workflow in your `infrastructure-live-root` repository to generate pull requests and additional repositories.

## Creating the infrastructure-live-root repository

Gruntwork provides a pre-configured git repository template that incorporates best practices while allowing for customization.

[infrastructure-live-root-template](https://github.com/gruntwork-io/infrastructure-live-root-template)

This template generates an `infrastructure-live-root` repository with a bootstrap workflow designed to scaffold a best-practices Terragrunt configuration. It includes patterns for module defaults, global variables, and account baselines. Additionally, it integrates Gruntwork Pipelines, which can be removed if not required.

The workflow can optionally scaffold the `infrastructure-live-access-control` and `infrastructure-catalog` repositories.

Navigate to the template repository and select **Use this template** -> **Create a new Repository**. Choose your organization as the owner, add a description if desired, set the repository to **private**, and click **Create repository**.

## Configuring Gruntwork app settings

Use the Gruntwork.io GitHub App to [add the repository as an Infra Root repository](/2.0/docs/pipelines/installation/viagithubapp#configuration).

If using the [machine user model](/2.0/docs/pipelines/installation/viamachineusers), ensure the `INFRA_ROOT_WRITE_TOKEN` (and `ORG_REPO_ADMIN_TOKEN` for enterprise customers) is added to the repository as a secret or configured as an organization secret.

## Updating the Bootstrap Workflow

Return to your `infrastructure-live-root` repository and follow the `README` instructions to update the bootstrap workflow for IaC Foundations. Provide details about your AWS organization, accounts, and default values for new account provisioning.

## Running the workflow

Follow the instructions in your `infrastructure-live-root` repository to execute the Bootstrap Workflow. Gruntwork support is available to address any questions that arise. During the workflow execution, you can choose to create the `infrastructure-live-access-control` and `infrastructure-catalog` repositories. These repositories will be created in your GitHub organization using values defined in the workflow configuration.

### Infrastructure live access control

This repository is primarily for Enterprise customers but is recommended for all users. When running the Bootstrap Workflow in your `infrastructure-live-root` repository, select the option to "Bootstrap the infrastructure-access-control repository."

### Infrastructure catalog

The Bootstrap Workflow also creates an empty `infrastructure-catalog` repository. This repository is used to store Terraform/OpenTofu modules authored by your organization for internal use. During the Bootstrap Workflow execution in your `infrastructure-live-root` repository, select the option to "Bootstrap the infrastructure-catalog repository."

## Completing instructions in Bootstrap Pull Requests

Each of your repositories will contain a Bootstrap Pull Request. Follow the instructions in these Pull Requests to finalize the setup of your IaC repositories.

:::info

The bootstrapping pull requests include pre-configured files, such as a `.mise.toml` file that specifies versions of OpenTofu and Terragrunt. Ensure you review and update these configurations to align with your organization's requirements.

:::

For example:

```bash
git clone git@github.com:acme/infrastructure-live.git
```

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

You can also use the `install` command to install them:

```bash
mise install
```

:::

## Configuring SCM Access

Pipelines needs the ability to interact with Source Control Management (SCM) platforms to fetch resources (e.g. IaC code, reusable CI/CD code and the Pipelines binary itself).

There are two ways to configure SCM access for Pipelines:

1. Using the [Gruntwork.io GitHub App](/2.0/docs/pipelines/installation/viagithubapp#configuration) (recommended for most GitHub users).
2. Using a [machine user](/2.0/docs/pipelines/installation/viamachineusers.md) (recommended for GitLab users, and for GitHub users who cannot use the GitHub App).

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

:::tip

What follows is a guide for creating the basic, minimal set of resources required to get started. If you have access to Gruntwork's [Infrastructure Library](/2.0/docs/library/concepts/overview), you can use off the following off-the-shelf modules to do the work for you:

- [OIDC Provider for GitHub Actions](/reference/modules/terraform-aws-security/github-actions-openid-connect-provider/)
- [IAM Role for GitHub Actions](/reference/modules/terraform-aws-security/github-actions-iam-role/)

:::

To get started, you can create the modules that you are going to provision for each of these in a `catalog/modules` directory.

```bash
mkdir -p catalog/modules/{github-actions-oidc-provider, github-actions-iam-role}
```

You'll also want to create the scaffolding for the Terragrunt units you want to provision.

```bash
mkdir -p live/acme/_global/{github-actions-oidc-provider, github-actions-plan-role, github-actions-apply-role}
```

<!-- FIXME: Finish implementing this. Maybe with the boilerplate template from service catalog -->

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

:::note

This may seem like a lot of work, but it's a one-time step to onboard a new subscription for management with Pipelines.

You'll receive all the IaC required to create this infrastructure soon, and the majority of the work will be to create a reusable catalog that makes it easy to bootstrap additional subscriptions in the future.

:::

The process that we'll follow to get these resources ready for Pipelines is:

1. Set up the catalog of IaC configurations for bootstrapping a new subscription
2. Provision these bootstrap resources using Terragrunt
3. Pull the bootstrap resources into state, using the storage account we just provisioned

### Setting up the catalog

To start setting up the catalog, create the following files in a `catalog` directory you create in your `infrastructure-live` repository:

```bash
mkdir -p catalog/{modules, units, stacks}
```

These subdirectories within the `catalog` directory will be used to store the reusable IaC configurations for bootstrapping each new subscription you want managed by Pipelines.

:::tip

We typically recommend using a separate repository for your Terragrunt infrastructure catalog, but we're using a single repository for simplicity in this guide.

You're free to do that if you would prefer it.

:::

Each of the following files can be copied into the `catalog` directory, with the filename listed at the top of the code block.

```hcl title="catalog/modules/entra-id-application/versions.tf"
terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.6.0"
    }
  }
}
```

```hcl title="catalog/modules/entra-id-application/variables.tf"
variable "display_name" {
  description = "The display name for the Entra ID application."
  type        = string
}

variable "description" {
  description = "The description for the Entra ID application."
  type        = string
}
```

```hcl title="catalog/modules/entra-id-application/main.tf"
resource "azuread_application" "app" {
  display_name = var.display_name
  description  = var.description
}
```

```hcl title="catalog/modules/entra-id-application/outputs.tf"
output "id" {
  description = "The ID of the Entra ID application."
  value       = azuread_application.app.id
}

output "client_id" {
  description = "The client ID of the Entra ID application."
  value       = azuread_application.app.client_id
}

output "display_name" {
  description = "The display name of the Entra ID application."
  value       = azuread_application.app.display_name
}
```

### Provisioning the resources

### Pulling the resources into state

</TabItem>
</Tabs>

## Creating `.gruntwork` HCL configurations

Create [HCL configurations](/2.0/reference/pipelines/configurations-as-code/) in the `.gruntwork` directory in the root of your `infrastructure-live` repository to tell Pipelines how you plan to organize your infrastructure, and how you plan to have Pipelines authenticate with your cloud provider(s).

For example:

```hcl title=".gruntwork/repository.hcl"
repository {
  deploy_branch_name = "main"
}
```

<Tabs>
<TabItem value="aws" label="AWS" default>

```hcl title=".gruntwork/environment.hcl"
environment "dev" {
  filter {
    paths = ["dev/*"]
  }

  authentication {
    aws_oidc {
      account_id = "123456789012"
      plan_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-apply"
    }
  }
}

environment "prod" {
  filter {
    paths = ["prod/*"]
  }

  authentication {
    aws_oidc {
      account_id = "987654321098"
      plan_iam_role_arn = "arn:aws:iam::987654321098:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::987654321098:role/pipelines-apply"
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

</TabItem>
<TabItem value="azure" label="Azure">

```hcl title=".gruntwork/environment.hcl"
environment "dev" {
  filter {
    paths = ["dev/*"]
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

environment "prod" {
  filter {
    paths = ["prod/*"]
  }

  authentication {
    azure_oidc {
      tenant_id       = "00000000-0000-0000-0000-000000000000"
      subscription_id = "22222222-2222-2222-2222-222222222222"

      plan_client_id  = "55555555-5555-5555-5555-555555555555"
      apply_client_id = "66666666-6666-6666-6666-666666666666"
    }
  }
}
```

:::tip

Learn more about how Pipelines authenticates to Azure in the [Authenticating to Azure](/2.0/docs/pipelines/concepts/cloud-auth/azure) page.

:::

</TabItem>
<TabItem value="custom" label="Custom">

```hcl title=".gruntwork/environment.hcl"
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

environment "prod" {
  filter {
    paths = ["prod/*"]
  }

  authentication {
    custom {
      auth_provider_cmd = "./scripts/custom-auth-prod.sh"
    }
  }
}
```

:::tip

Learn more about how Pipelines can authenticate with custom authentication in the [Custom Authentication](/2.0/docs/pipelines/concepts/cloud-auth/custom) page.

:::

</TabItem>
</Tabs>

## Creating `.github/workflows/pipelines.yml`

Create a `.github/workflows/pipelines.yml` file in the root of your `infrastructure-live` repository with the following content:

```yaml title=".github/workflows/pipelines.yml"
name: Pipelines
run-name: "[GWP]: ${{ github.event.commits[0].message || github.event.pull_request.title || 'No commit message' }}"
on:
  push:
    branches:
      - main
    paths-ignore:
      - ".github/**"
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
    paths-ignore:
      - ".github/**"

# Permissions to assume roles and create pull requests
permissions:
  id-token: write
  contents: write
  pull-requests: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@main
```

:::tip

You can read the [Pipelines GitHub Actions Workflow](https://github.com/gruntwork-io/pipelines-workflows/blob/main/.github/workflows/pipelines.yml) to learn how this GitHub Actions workflow calls the Pipelines CLI to run your pipelines.

:::

## Commit and push your changes

Commit and push your changes to your repository.

:::note

You should include `[skip ci]` in your commit message here to prevent triggering the Pipelines workflow.

:::

```bash
git add .
git commit -m "Add Pipelines GitHub Actions workflow [skip ci]"
git push
```

🚀 You've successfully added Gruntwork Pipelines to your new repository!

## Next steps

You have successfully completed the installation of Gruntwork Pipelines in a new repository. Proceed to [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change.md) to begin deploying changes.
