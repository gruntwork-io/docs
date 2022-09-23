# Gruntwork Service Catalog Overview

The Gruntwork Service Catalog consists of a number of reusable, customizable, battle-tested, production-grade
[infrastructure-as-code services](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules) that you can use to deploy and manage your infrastructure, including Docker
orchestration, EC2 orchestration, load balancing, networking, databases, caches, monitoring, alerting, CI/CD, secrets
management, VPN, and much more.

1. [Service Catalog Terminology](#service-catalog-terminology)
1. [The tools used in the Service Catalog](#the-tools-used-in-the-service-catalog)
1. [How to navigate the Service Catalog](#how-to-navigate-the-service-catalog)
1. [Maintenance and versioning](#maintenance-and-versioning)

## Service Catalog Terminology

- **Module**: Reusable code to deploy and manage one piece of infrastructure. Modules are fairly generic building
  blocks, so you don't typically deploy a single module directly, but rather, you write code that combines the modules
  you need for a specific use case. For example, one module might deploy the control plane for Kubernetes and a
  separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes
  cluster. The [Gruntwork Infrastructure as Code (IaC) Library](https://gruntwork.io/infrastructure-as-code-library/)
  contains hundreds of battle-tested, commercially supported and maintained modules that you can use and combine in
  many different ways.

- **Service**: Reusable code that combines multiple modules to configure a service for a specific use case. Services
  are designed for specific use cases and meant to be deployed directly. For example, the `eks-cluster` service
  combines all the modules you need to run an EKS (Kubernetes) cluster in a typical production environment, including
  modules for the control plane, worker nodes, secrets management, log aggregation, alerting, and so on. The [Gruntwork
  Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/) is a collection of battle-tested, commercially
  supported and maintained services that you can use to deploy production-grade infrastructure in minutes.

## The tools used in the Service Catalog

The Gruntwork Service Catalog is designed to be deployed using the following tools:

1. [Terraform](https://www.terraform.io/). Used to define and manage most of the basic infrastructure, such as servers,
   databases, load balancers, and networking. The Gruntwork Service Catalog is compatible with vanilla
   [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), [Terraform
   Cloud](https://www.hashicorp.com/blog/announcing-terraform-cloud/), and [Terraform
   Enterprise](https://www.terraform.io/docs/enterprise/index.html).

1. [Packer](https://www.packer.io/). Used to define and manage _machine images_ (e.g., VM images). The main use case is
   to package code as [Amazon Machine Images (AMIs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
   that run on EC2 instances. Once you've built an AMI, you use Terraform to deploy it into AWS.

## How to navigate the Service Catalog

The code in the `terraform-aws-service-catalog` repo is organized into three primary folders:

1. `modules`: The core implementation code of this repo. All the services that you will use and deploy are defined
   within, such as the EKS cluster service in `modules/services/eks-cluster`.

1. `examples`: Sample code that shows how to use the services in the `modules` folder and allows you to try the
   services out without having to write any code: you `cd` into one of the folders, follow a few steps in the README
   (e.g., run `terraform apply`), and you'll have fully working infrastructure up and running. In other words, this is
   executable documentation. Note that the `examples` folder contains two sub-folders:

   1. `for-learning-and-testing`: Example code that is optimized for learning, experimenting, and testing, but not
      direct production usage). Most of these examples use Terraform directly to make it easy to fill in dependencies
      that are convenient for testing, but not necessarily those you'd use in production: e.g., default VPCs or mock
      database URLs.

   1. `for-production`: Example code optimized for direct usage in production. This is code from the [Gruntwork Reference
      Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an end-to-end,
      integrated tech stack on top of the Gruntwork Service Catalog. To keep the code DRY and manage dependencies
      between modules, the code is deployed using [Terragrunt](https://terragrunt.gruntwork.io/). However, Terragrunt
      is NOT required to use the Gruntwork Service Catalog: you can alternatively use vanilla Terraform or Terraform
      Cloud / Enterprise, as described [here](https://docs.gruntwork.io/reference/services/intro/deploy-new-infrastructure#how-to-deploy-terraform-code-from-the-service-catalog).

1. `test`: Automated tests for the code in `modules` and `examples`.

## Maintenance and versioning

All of the code in the Gruntwork Service Catalog is _versioned_. The Service Catalog is commercially maintained by
Gruntwork, and every time we make a change, we put out a new [versioned
release](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases), and announce it in the monthly [Gruntwork
Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter).

We use version numbers of the form `MAJOR.MINOR.PATCH` (e.g., `1.2.3`), following the principles of [semantic
versioning](https://semver.org/). In traditional semantic versioning, you increment the:

1. MAJOR version when you make incompatible API changes,
1. MINOR version when you add functionality in a backwards compatible manner, and
1. PATCH version when you make backwards compatible bug fixes.

However, much of the Gruntwork Service Catalog is built on Terraform, and as Terraform is still not at version 1.0.0,
the code in the Service Catalog is is using `0.MINOR.PATCH` version numbers. With `0.MINOR.PATCH`, the rules are a bit
different, where you increment the:

1. MINOR version when you make incompatible API changes
1. PATCH version when you add backwards compatible functionality or bug fixes.

We try to minimize backwards incompatible changes, but when we have to make one, we bump the MINOR version number, and
include migration instructions in the [release notes](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases).
Makes sure to ALWAYS read the release notes and migration instructions (if any) to avoid errors and outages!


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "5eb1606803f10d39a682642586a222a0"
}
##DOCS-SOURCER-END -->
