# What is a service module?

The Gruntwork Service Catalog consists of a number of customizable, production-grade infrastructure-as-code services that you can use to deploy and manage your infrastructure. This includes Docker orchestration, EC2 orchestration, load balancing, networking, databases, caches, monitoring, alerting, CI/CD, secrets management, VPN, and much more. Services combine multiple modules to configure an end-to-end solution.

## When should I use a service?

Using a service can save you time piecing together individual modules and testing that they’re correctly referencing each other. These are designed for specific use cases such as EKS and ECS clusters, VPCs with public and private subnets, and databases.

For example, the `eks-cluster` service combines all the modules you need to run an EKS (Kubernetes) cluster in a typical production environment, including modules for the control plane, worker nodes, secrets management, log aggregation, alerting, and so on.

If you need more flexibility than our services provide, then you can combine modules from our [Module Catalog](/iac/overview/modules), your own modules, or open source modules to meet your specific use case.

CIS customers also have access to the `terraform-aws-cis-service-catalog` repository to help ensure conformity to the [CIS AWS Foundations Benchmark](https://gruntwork.io/achieve-compliance/).

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

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "66f96a57f0b4025b316f410130c0ef39"
}
##DOCS-SOURCER-END -->
