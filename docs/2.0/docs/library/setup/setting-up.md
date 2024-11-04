# Setting up your machine

The Gruntwork IaC library requires that you have a few tools installed in order to leverage our pre-built modules and services. We recommend installing these tools locally so you can develop and deploy modules and services on your local machine.

## Terraform

Terraform is an open source infrastructure provisioning tool that allows you to define and manage a wide variety of infrastructure (e.g., servers, load balancers, databases, network settings, and so on) as code across a wide variety of providers (e.g., AWS, GCP, Azure). Terraform defines cloud and on-premise resources in human-readable configuration language and offers a consistent workflow for provisioning and managing infrastructure.

Gruntwork’s IaC library is built using Terraform, so having Terraform installed is required.

### Installation
Terraform is supported on Mac (x86 and Apple Silicon), Windows, and Linux. To learn how to install for your specific OS, follow the guide to [install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-cli) on the Hashicorp website.

If you need multiple versions of Terraform installed, [mise](https://github.com/jdx/mise) is a tool that can be used for managing and using multiple versions of Terraform.

### Learn more
If you’re new to Terraform, we recommend starting with learning about Terraform’s [configuration language](https://developer.hashicorp.com/terraform/language) then familiarizing yourself with the basics of [provisioning infrastructure](https://developer.hashicorp.com/terraform/cli/run) using Terraform.

For a more in-depth guide, check out our [Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca) for a thorough introduction to the language.

## Terragrunt

[Terragrunt](https://terragrunt.gruntwork.io) is a tool developed by Gruntwork that provides extra tools for keeping your Terraform configurations DRY, working with multiple Terraform modules, and managing remote state. Terragrunt allows you to execute multiple Terraform commands at once, centrally manage your Terraform state configuration, and set repeatable CLI arguments. Since Terraform is a dependency of Terragrunt, you can continue to write modules for Terraform in the Terraform configuration language, then reference and re-use the modules in different environments or applications.

:::info
Terragrunt is not a required tool to use the IaC library, but it does provide many convenience features on top of Terraform.
:::

### Installation
Terragrunt is supported on Mac (x86 and Apple Silicon), Windows, and Linux. To install Terragrunt, follow the guide on how to [install Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) on the Terragrunt website.

If you need multiple versions of Terragrunt installed, [mise](https://github.com/jdx/mise) supports the use of the [3rd party ASDF Terragrunt plugin](https://github.com/lotia/asdf-terragrunt).

### Learn more
To learn more about Terragrunt, check out the [official documentation](https://terragrunt.gruntwork.io/docs/).
