# Initial setup

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](/2.0/docs/pipelines/concepts/overview) to view documentation for the most recent version.
:::

To set up IaC Foundations, we use three pre-configured git repository templates that include best practices and also allow for customization.

For each repository below, navigate to the template repository and select **Use this template** -> **Create a new Repository**. This will initiate repository creation. You should select your org as the owner, add a description if you like, make sure you are creating a **private** repo, and click **Create repository**.

The repository template will be created, and you can follow the instructions in the `README` to bootstrap your IaC Foundations. Gruntwork is available to assist with questions around other patterns as they arise.

## Infrastructure Live Template

_[https://github.com/gruntwork-io/infrastructure-live-template](https://github.com/gruntwork-io/infrastructure-live-template)_

This template creates an infrastructure-live repository with scaffolding for a best practices Terragrunt configuration, including patterns for module defaults, global variables, and account baselines. It also configures Gruntwork Pipelines, which is easy to remove if you don't want it.

## Infrastructure Modules Template

_[https://github.com/gruntwork-io/infrastructure-modules-template](https://github.com/gruntwork-io/infrastructure-modules-template)_

This template creates an empty infrastructure-modules repository that will be used to store Terraform/OpenTofu modules that your organization has authored and intends to use within your organization.

## Infrastructure Pipelines Template

_[https://github.com/gruntwork-io/infrastructure-pipelines-template](https://github.com/gruntwork-io/infrastructure-pipelines-template)_

This template is only necessary if you plan on implementing [Gruntwork Pipelines](../overview/index.md).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4a382866f3c80d23319a902b0b1a872b"
}
##DOCS-SOURCER-END -->
