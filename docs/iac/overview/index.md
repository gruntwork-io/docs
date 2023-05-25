# What is the Infrastructure as Code Library?

The Gruntwork Infrastructure as Code Library (IaC Library) is a collection of reusable code that enables you to deploy and manage infrastructure quickly and reliably. It promotes code reusability, modularity, and consistency in infrastructure deployments. We’ve taken the thousands of hours we spent building infrastructure on AWS and condensed all that experience and code into pre-built packages or modules.  

The library consists of two types of code: Modules & Services

## Modules

Modules are reusable code components that are used to deploy and manage specific pieces of infrastructure. These modules encapsulate the configuration and resource definitions required to create and manage a particular component, such as a VPC, ECS cluster, or an Auto Scaling Group. For more information on modules check out the [Modules page](/iac/overview/modules/).

## Services

Services in the service catalog are reusable code that combines multiple modules from the IaC Library, simplifying the deployment and management of complex infrastructure configurations. Rather than dealing with individual modules and their dependencies, users can directly deploy services tailored for a particular use case. 

For more information on the service catalog check out the [Services page](/iac/overview/services/).

## Tools used in the IaC Library

The Gruntwork IaC Library is deployed using the following tools:

1. [Terraform](https://www.terraform.io/). Used to define and manage most of the basic infrastructure, such as servers, databases, load balancers, and networking. The Gruntwork Service Catalog is compatible with vanilla [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), [Terraform
   Cloud](https://www.hashicorp.com/blog/announcing-terraform-cloud/), and [Terraform
   Enterprise](https://www.terraform.io/docs/enterprise/index.html).

1. [Packer](https://www.packer.io/). Used to define and manage _machine images_ (e.g., VM images). The main use case is
   to package code as [Amazon Machine Images (AMIs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
   that run on EC2 instances. Once you’ve built an AMI, you use Terraform to deploy it into AWS.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "43cbbcd36f49c60af3dab19b2f9e83fb"
}
##DOCS-SOURCER-END -->
