# What is the Infrastructure as Code Library?

The Gruntwork Infrastructure as Code Library (IaC Library) is a collection of reusable code that enables you to deploy and manage infrastructure quickly and reliably. We've taken the thousands of hours we spent building infrastructure on AWS and condensed all that experience and code into pre-built packages or modules.  

The library consists of two types of code: Modules & Services

## Modules

Modules are reusable code to deploy and manage one piece of infrastructure and each one is a battle-tested, best-practices definition of a piece of infrastructure, such as a VPC, ECS cluster, or an Auto Scaling Group. For more information on modules check out the [Modules page](/iac/whats-this/modules/)

## Services

Services in the service catalog are reusable code that combines multiple modules to configure a service for a specific use case. These are designed for specific use cases and meant to be deployed directly. For more information on the service catalog check out the [Services page](/iac/whats-this/services/)

## The tools used in the IaC Library

The Gruntwork IaC Library is designed to be deployed using the following tools:

1. [Terraform](https://www.terraform.io/). Used to define and manage most of the basic infrastructure, such as servers, databases, load balancers, and networking. The Gruntwork Service Catalog is compatible with vanilla [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), [Terraform
   Cloud](https://www.hashicorp.com/blog/announcing-terraform-cloud/), and [Terraform
   Enterprise](https://www.terraform.io/docs/enterprise/index.html).

1. [Packer](https://www.packer.io/). Used to define and manage _machine images_ (e.g., VM images). The main use case is
   to package code as [Amazon Machine Images (AMIs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
   that run on EC2 instances. Once you've built an AMI, you use Terraform to deploy it into AWS.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e9a26f2ae902a33659e17c464714405a"
}
##DOCS-SOURCER-END -->
