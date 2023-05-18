# Setting up your machine

The Gruntwork IaC library requires that you have a few tools installed in order to leverage our pre-built modules and services. We recommend installing these tools locally so you can develop and deploy modules and services on your local machine.

## Terraform

Terraform is an open source infrastructure provisioning tool that allows you to define and manage a wide variety of infrastructure (e.g., servers, load balancers, databases, network settings, and so on) as code across a wide variety of providers (e.g., AWS, GCP, Azure). Terraform defines cloud and on-premise resources in human-readable configuration language and offers a consistent workflow for provisioning and managing infrastructure.

Gruntwork's IaC library is built using Terraform, so having Terraform installed is required.

### Installation
Terraform is supported on Mac (x86 and Apple Silicon), Windows, and Linux. To learn how to install for your specific OS, follow the guide to [install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-cli) on the Hashicorp website.

If you need multiple versions of Terraform installed, [tfenv](https://github.com/tfutils/tfenv#installation) is a tool for managing and using multiple versions of Terraform. It was inspired by similar tools `rbenv` for Ruby versions and `pyenv` for Python.

### Learn more
If you're new to Terraform, we recommend starting with learning about Terraform's [configuration language](https://developer.hashicorp.com/terraform/language) then familiarizing yourself with the basics of [provisioning infrastructure](https://developer.hashicorp.com/terraform/cli/run) using Terraform.

If you want to skip immediately to learning, you can learn how to [deploy your first module](./deploying-a-module.md). For a more in-depth guide, check out our [Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca) for a thorough introduction to the language.

## Terragrunt

Terragrunt is a thin wrapper that provides extra tools for keeping your configurations DRY, working with multiple Terraform modules, and managing remote state. Terragrunt allows you to execute multiple Terraform commands at once, centrally manage your Terraform state configuration, and set repeatable CLI arguments. Since Terraform is a dependency of Terragrunt, you can continue to write modules for Terraform in the Terraform configuration language, then reference and re-use the modules in different environments or applications.

Terragrunt is not a required tool, but it does provide many convenience features on top of Terraform.

### Installation
Terragrunt is supported on Mac (x86 and Apple Silicon), Windows, and Linux. To install Terragrunt, follow the guide on how to [install Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) on the Terragrunt website.

If you need multiple versions of Terragrunt installed, [tgswitch](https://github.com/warrensbox/tgswitch#installation) is a tool for managing and using multiple versions of Terragrunt with a similar feature set to `tfenv`.

### Learn more
To learn more about Terragrunt, check out the [official documentation](https://terragrunt.gruntwork.io/docs/).

## What's Next

Now that you've got the required tools installed, you'll learn how to [access the IaC Library code](./accessing-the-code.md).

If you're ready to get started with creating and deploying a module, jump to [deploying your first module](./deploying-a-module.md).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "174274e6c95766e273d68904fd1a7a61"
}
##DOCS-SOURCER-END -->
