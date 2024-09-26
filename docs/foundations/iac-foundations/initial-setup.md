# Initial setup

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines released in May 2024.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/iac-foundations/initial-setup.md) to get the documentation for that version.
:::


To set up your IaC Foundations you'll need to complete the following steps:
1. Create your `infrastructure-live-root` repository from Gruntwork's GitHub template.
1. Install the Gruntwork GitHub App into your organization.
1. Configure the Gruntwork GitHub App to authorize your `infrastructure-live-root` repository.
1. Update the Bootstrap Workflow to configure your AWS settings.
1. Run the Bootstrap Workflow in your `infrastructure-live-root` repository to create pull requests and repositories.


## Creating Infrastructure Live Root

To set up IaC Foundations, we use a pre-configured git repository template that includes best practices and also allows for customization.

[infrastructure-live-root-template](https://github.com/gruntwork-io/infrastructure-live-root-template)

This template creates an infrastructure-live-root repository with a bootstrap workflow that can be run to create scaffolding for a best practices Terragrunt configuration, including patterns for module defaults, global variables, and account baselines. It also configures Gruntwork Pipelines, which is easy to remove if you don't want it.

The workflow also optionally creates and scaffolds your `infrastructure-live-access-control` and `infrastructure-modules` repositories.

Navigate to the template repository and select **Use this template** -> **Create a new Repository**. This will initiate repository creation. You should select your org as the owner, add a description if you like, make sure you are creating a **private** repo, and click **Create repository**.

## Installing The Gruntwork GitHub App

Gruntwork Workflows use the Gruntwork GitHub App to perform authorized actions within your repositories, and to access Gruntwork code. The app must be installed in your organization in order to create new repositories.

[Click here](FIXME: Link to prod app installation) to install the Gruntwork GitHub app.

## Configuring Gruntwork App Settings

After installing the Gruntwork GitHub App you should be redirected to the Gruntwork Developer Portal. If not - [click here](FIXME: URL to app settings) to access the settings page. Under the section Infrastructure Root Repositories add your new repository.

## Update The Bootstrap Workflow

Return to your `infrastructure-live-root` repository and follow the instructions in the `README` to update the bootstrap workflow for your IaC Foundations. You will need to provide details of your AWS organization and accounts, as well as default values to be used when vending new accounts.

## Run The Workflow

Follow the instructions in your `infrastructure-live-root` to run the Bootstrap workflow. Gruntwork is available to assist with questions around other patterns as they arise. When running the workflow you can select options to create `infrastructure-live-access-control` and `infrastructure-modules` repositories. These will be created in your GitHub organization using values defined in the workflow file.

### Infrastructure Live Access Control

This repository is only necessary for Enterprise customers, but is recommended for all customers. When running the Bootstrap workflow in your `infrastructure-live-root` account, select the option to "Bootstrap the infrastructure-access-control repository".

### Infrastructure Modules

This template creates an empty infrastructure-modules repository that will be used to store Terraform/OpenTofu modules that your organization has authored and intends to use within your organization. When running the Bootstrap workflow in your `infrastructure-live-root` account, select the option to "Bootstrap the infrastructure-modules repository".


## Complete Instructions In The Bootstrap Pull Requests

Each of your repositories will now contain a Bootstrap Pull Request. Follow the instructions in the Pull Requests to complete setup of your IaC repositories.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7a2d61e80ae20fbe64a65567cea3862c"
}
##DOCS-SOURCER-END -->
