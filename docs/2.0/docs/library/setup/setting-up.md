# Setting Up Your Machine  

The Gruntwork IaC library requires installing a few tools to leverage our pre-built modules and services. We recommend installing these tools locally so you can develop and deploy modules and services directly from your machine.  

## Terraform  

Terraform is an open-source infrastructure provisioning tool that allows you to define and manage a wide range of infrastructure (e.g., servers, load balancers, databases, network settings) as code across multiple providers (e.g., AWS, GCP, Azure). Terraform defines cloud and on-premise resources in a human-readable configuration language and provides a consistent workflow for provisioning and managing infrastructure.  

Gruntwork’s IaC library is built using Terraform, so having Terraform installed is required.  

### Installation  

Terraform is supported on Mac (x86 and Apple Silicon), Windows, and Linux. For installation instructions specific to your operating system, refer to the official [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-cli) guide on HashiCorp’s website.  

If you need to manage multiple versions of Terraform, consider using [mise](https://github.com/jdx/mise), a tool that simplifies managing numerous versions of Terraform.  

### Learn More  

If you’re new to Terraform, start by learning Terraform’s [configuration language](https://developer.hashicorp.com/terraform/language) and understanding the basics of [provisioning infrastructure](https://developer.hashicorp.com/terraform/cli/run).  

For a more in-depth guide, refer to our [Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca) for a thorough introduction.  

## Terragrunt  

[Terragrunt](https://terragrunt.gruntwork.io) is a tool developed by Gruntwork that extends Terraform’s capabilities by helping you keep configurations DRY, manage multiple Terraform modules, and handle remote state more effectively. Terragrunt allows you to execute various Terraform commands simultaneously, centralize Terraform state configuration, and manage repeatable CLI arguments.  

Because Terragrunt depends on Terraform, you can continue writing modules in the Terraform configuration language and reference those modules across different environments or applications.  

:::info  
Terragrunt is not required to use the IaC library, but it provides many convenience features on top of Terraform.  
:::  

### Installation  

Terragrunt is supported on Mac (x86 and Apple Silicon), Windows, and Linux. To install Terragrunt, follow the official [Install Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) guide on the Terragrunt website.  

For managing multiple versions of Terragrunt, [mise](https://github.com/jdx/mise) supports the use of the [3rd party ASDF Terragrunt plugin](https://github.com/lotia/asdf-terragrunt).  

### Learn More  

To learn more about Terragrunt, refer to the [official documentation](https://terragrunt.gruntwork.io/docs/).  
