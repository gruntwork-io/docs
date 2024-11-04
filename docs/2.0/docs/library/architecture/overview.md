import OpenTofuNotice from "/src/components/OpenTofuNotice"

# Overview

## How modules are structured

The code in the module repos are organized into three primary folders:

1. `modules`: The core implementation code. All of the modules that you will use and deploy are defined within. For example to ECS cluster module in the `terraform-aws-ecs` repo in `modules/ecs-cluster`.

1. `examples`: Sample code that shows how to use the modules in the `modules` folder and allows you to try them out without having to write any code: `cd` into one of the folders, follow a few steps in the README (e.g. run `terraform apply`), and you’ll have a fully working module up and running. In other words, this is executable documentation.

1. `test`: Automated tests for the code in modules and examples.

We follow Hashicorp's [Standard Model Structure](https://developer.hashicorp.com/terraform/language/modules/develop/structure) for our files (`main.tf`, `variables.tf`, `outputs.tf`). In the `variables.tf` file we always put the required variables at the top of the file, followed by the optional variables. Although there are often a lot of ways to configure our modules, we set reasonable defaults and try to minimize the effort required to configure the modules to the most common use cases.

## How services are structured

The code in the `terraform-aws-service-catalog` repo is organized into three primary folders:

1. `modules`: The core implementation code of this repo. All the services that you will use and deploy are defined within, such as the EKS cluster service in modules/services/eks-cluster.

1. `examples`: Sample code that shows how to use the services in the modules folder and allows you to try the services out without having to write any code: you `cd` into one of the folders, follow a few steps in the README (e.g., run `terraform apply`), and you’ll have fully working infrastructure up and running. In other words, this is executable documentation. Note that the examples folder contains two sub-folders:

    1. `for-learning-and-testing`: Example code that is optimized for learning, experimenting, and testing, but not
      direct production usage. Most of these examples use Terraform directly to make it easy to fill in dependencies
      that are convenient for testing, but not necessarily those you’d use in production: e.g., default VPCs or mock
      database URLs.

    1. `for-production`: Example code optimized for direct usage in production. This is code from the [Gruntwork Reference
      Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an end-to-end,
      integrated tech stack on top of the Gruntwork Service Catalog. To keep the code DRY and manage dependencies
      between modules, the code is deployed using [Terragrunt](https://terragrunt.gruntwork.io/). However, Terragrunt
      is NOT required to use the Gruntwork Service Catalog: you can alternatively use vanilla Terraform or Terraform
      Cloud / Enterprise, as described [here](https://docs.gruntwork.io/reference/services/intro/deploy-new-infrastructure#how-to-deploy-terraform-code-from-the-service-catalog).

    1. Not all modules have a `for-production` example, but you can still create a production-grade configuration by
       using the template provided in this discussion question, [How do I use the modules in terraform-aws-service-catalog
       if there is no example?](https://github.com/gruntwork-io/knowledge-base/discussions/360#discussioncomment-25705480).

1. `test`: Automated tests for the code in modules and examples.

## Tools used in Library

<OpenTofuNotice />

Gruntwork Library has been created using the following tools:

1. [Terraform](https://www.terraform.io/). The Library contains nearly 300 Terraform modules that cover a range of common use cases in AWS. All library modules can be used with vanilla [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), or third-party Terraform pipeline tools such as [Terraform Cloud](https://www.hashicorp.com/blog/announcing-terraform-cloud/) and [Terraform Enterprise](https://www.terraform.io/docs/enterprise/index.html).

1. [Packer](https://www.packer.io/). The Library defines _machine images_ (e.g., VM images) using Packer, where the main use case is building Amazon Machine Images (AMIs) that run on EC2 instances whose configuration is all defined in code. Once you’ve built an AMI, you can use Terraform to deploy it into AWS.

1. [Terratest](https://terratest.gruntwork.io/). All modules are functionally validated with automated tests written using Terratest.
