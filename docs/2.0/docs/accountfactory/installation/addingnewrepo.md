# Adding Account Factory to a new repository

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
