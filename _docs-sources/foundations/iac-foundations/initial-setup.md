# Initial setup

To set up IaC Foundations, we use three pre-configured git repository templates that include best practices and also allow for customization.

For each repository below, navigate to the template repository and select **Use this template** -> **Create a new Repository**. This will initiate repository creation. You should select your org as the owner, add a description if you like, make sure you are creating a **private** repo, and click **Create repository**.

The repository template will be created, and you can follow the instructions in the `README` to bootstrap your IaC Foundations. Gruntwork is available to assist with questions around other patterns as they arise.

## Infrastructure Live Root Template

[infrastructure-live-root-template](https://github.com/gruntwork-io/infrastructure-live-root-template)

This template creates an infrastructure-live-root repository with scaffolding for a best practices Terragrunt configuration, including patterns for module defaults, global variables, and account baselines. It also configures Gruntwork Pipelines, which is easy to remove if you don't want it.

## Infrastructure Live Access Control Template

[infrastructure-live-access-control-template](https://github.com/gruntwork-io/infrastructure-live-access-control-template)

This template is only necessary for Enterprise customers, but is recommended for all customers.

## Infrastructure Modules Template

[infrastructure-modules-template](https://github.com/gruntwork-io/infrastructure-modules-template)

This template creates an empty infrastructure-modules repository that will be used to store Terraform/OpenTofu modules that your organization has authored and intends to use within your organization.
