import OpenTofuNotice from "/src/components/OpenTofuNotice."

# Overview

## How modules are structured

The code in the module repositories is organized into three primary folders:

1. `modules`: This folder contains the core implementation code. All modules you use and deploy are defined here. For example, you can locate the ECS cluster module in the `terraform-aws-ecs` repository within `modules/ecs-cluster`.

1. `examples`: This folder includes sample code demonstrating how to use the modules in the `modules` folder. These examples allow you to try the modules without writing code. Navigate to one of the example directories, follow the steps in the README (e.g., run `terraform apply`), and you will have a working module. These examples serve as executable documentation.

1. `test`: This folder contains automated tests for the code in both the `modules` and `examples` folders.

The structure of these files follows HashiCorp's [Standard Module Structure](https://developer.hashicorp.com/terraform/language/modules/develop/structure), including `main.tf`, `variables.tf`, and `outputs.tf`. In the `variables.tf` file, required variables are listed first, followed by optional ones. Although many configurations are possible, the modules are designed with reasonable defaults to simplify setup for the most common use cases.

## How services are structured

The `terraform-aws-service-catalog` repository organizes its code into three main folders:

1. `modules`: This folder contains the core implementation code for the services you use and deploy. For instance, the EKS cluster service resides in `modules/services/eks-cluster`.

1. `examples`: This folder provides a sample code demonstrating how to use the services in the `modules` folder. These examples enable you to deploy services without writing code. Navigate to a directory, follow the README instructions (e.g., run `terraform apply`), and you will have working infrastructure. This folder contains two sub-folders:

1. `for-learning-and-testing`: These examples are optimized for experimentation and testing but not for direct production use. They often rely on default VPCs or mock database URLs for convenience.

1. `for-production`: These examples are optimized for direct production use. They showcase how Gruntwork's Reference Architecture integrates a complete tech stack using the Gruntwork Service Catalog. To keep the code DRY and manage dependencies, you can deploy these examples using [Terragrunt](https://terragrunt.gruntwork.io/). Terragrunt is not required to use the Gruntwork Service Catalog; you can use vanilla Terraform or Terraform Cloud/Enterprise.

1. Not all modules include a `for-production` example. However, you can create a production-grade configuration using the template provided in [this discussion](https://github.com/gruntwork-io/knowledge-base/discussions/360#discussioncomment-25705480).

1. `test`: This folder includes automated tests for the code in the `modules` and `examples` folders.

## Tools used in Library

<OpenTofuNotice />

Gruntwork built its IaC Library using the following tools:

1. [Terraform](https://www.terraform.io/). The Library contains nearly 300 Terraform modules covering common AWS use cases. All modules are compatible with vanilla [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), or third-party pipeline tools like [Terraform Cloud](https://www.hashicorp.com/blog/announcing-terraform-cloud/) and [Terraform Enterprise](https://www.terraform.io/docs/enterprise/index.html).

1. [Packer](https://www.packer.io/). The Library includes definitions for _machine images_ (e.g., VM images) using Packer. A common use case is creating Amazon Machine Images (AMIs) for EC2 instances, where configuration is defined entirely in code. After building an AMI, you can deploy it using Terraform.

1. [Terratest](https://terratest.gruntwork.io/). All modules undergo functional validation through automated tests written in Terratest.
