# Initial setup

To set up Gruntwork Pipelines in a new repository you'll need to complete the following steps:
1. Create your `infrastructure-live-root` repository from Gruntwork's GitHub template.
2. Configure the Gruntwork.io GitHub App to authorize your `infrastructure-live-root` repository, alternatively ensure that the appropriate machine user tokens have been setup as repository or organization secrets.
3. Update the Bootstrap Workflow to configure your AWS settings.
4. Run the Bootstrap Workflow in your `infrastructure-live-root` repository to create pull requests and repositories.


## Creating Infrastructure Live Root

To set up IaC Foundations, we use a pre-configured git repository template that includes best practices and also allows for customization.

[infrastructure-live-root-template](https://github.com/gruntwork-io/infrastructure-live-root-template)

This template creates an infrastructure-live-root repository with a bootstrap workflow that can be run to create scaffolding for a best practices Terragrunt configuration, including patterns for module defaults, global variables, and account baselines. It also configures Gruntwork Pipelines, which is easy to remove if you don't want it.

The workflow also optionally creates and scaffolds your `infrastructure-live-access-control` and `infrastructure-catalog` repositories.

Navigate to the template repository and select **Use this template** -> **Create a new Repository**. This will initiate repository creation. You should select your org as the owner, add a description if you like, make sure you are creating a **private** repo, and click **Create repository**.

## Configuring Gruntwork App Settings

Configure the Gruntwork.io GitHub App to [add this repository as an Infra Root repository](/2.0/docs/pipelines/installation/viagithubapp#configuration).

If you're using our [machine user model](/2.0/docs/pipelines/installation/viamachineusers.md) then ensure the `INFRA_ROOT_WRITE_TOKEN` (and `ORG_REPO_ADMIN_TOKEN` for enterprise customers) is added to this repository as a secret and/or is set as an organization secret.

## Update The Bootstrap Workflow

Return to your `infrastructure-live-root` repository and follow the instructions in the `README` to update the bootstrap workflow for your IaC Foundations. You will need to provide details of your AWS organization and accounts, as well as default values to be used when vending new accounts.

## Run The Workflow

Follow the instructions in your `infrastructure-live-root` to run the Bootstrap workflow. Gruntwork is available to assist with questions around other patterns as they arise. When running the workflow you can select options to create `infrastructure-live-access-control` and `infrastructure-catalog` repositories. These will be created in your GitHub organization using values defined in the workflow file.

### Infrastructure Live Access Control

This repository is only necessary for Enterprise customers, but is recommended for all customers. When running the Bootstrap workflow in your `infrastructure-live-root` account, select the option to "Bootstrap the infrastructure-access-control repository".

### Infrastructure Modules

The Bootstrap workflow creates an empty infrastructure-catalog repository that will be used to store Terraform/OpenTofu modules that your organization has authored and intends to use within your organization. When running the Bootstrap workflow in your `infrastructure-live-root` account, select the option to "Bootstrap the infrastructure-catalog repository".

## Complete Instructions In The Bootstrap Pull Requests

Each of your repositories will now contain a Bootstrap Pull Request. Follow the instructions in the Pull Requests to complete setup of your IaC repositories.

:::info

These bootstrapping pull requests include some stock configuration, such as a `mise.toml` file which specifies versions of OpenTofu and Terragrunt to use.  Please make sure you review these files and update the configuration to match your organization's requirements.
:::