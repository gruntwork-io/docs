# What you need to know

Gruntwork accelerates your infrastructure. Our products allow you to treat your infrastructure like you do your application: as code, complete with pull requests and peer reviews. Our products require a _variety of skills_ to maintain and customize to your needs over time.

## Terraform

Our modules are all built using [Terraform](https://www.terraform.io/). You should be comfortable using Terraform for Infrastructure as Code.

## Terragrunt

If you purchase the Reference Architecture, it is delivered in [Terragrunt](https://terragrunt.gruntwork.io/), our open source wrapper around Terraform which allows you to

1. Separate your monolithic terraform state files into smaller ones to speed up your plans and applies
2. Keep your infrastructure code DRY

See [How to Manage Multiple Environments with Terraform](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-32c7bc5d692) and our [Terragrunt Quick start](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/) documentation for more details.

## Git and GitHub

Our code is stored in Git repositories in GitHub. You must have a working knowledge of Git via SSH (`add`, `commit`, `pull`, branches, et cetera) and GitHub (Pull requests, issues, et cetera) in order to interface with the Reference Architecture and our code library.

## AWS

To be successful with the infrastructure provisioned by us, you must have a decent working knowledge of AWS, its permissions schemes ([IAM](https://aws.amazon.com/iam/)), services, and APIs. While having AWS certification is not required, it is certainly helpful. Since Gruntwork is an accelerator for your AWS infrastructure and not an abstraction layer in front of AWS, knowledge of AWS and the services you intend to use is required.

## Containerization tools like Docker and Packer

We create Docker containers throughout our code library, and use them heavily in our [Gruntwork Pipelines](https://gruntwork.io/pipelines/) product, an important piece of the Reference Architecture. Containerization is an important part of helping many companies scale in the cloud, and we’re no exception. Familiarity with creating docker images and pushing and pulling them from repositories is required. Likewise, we use Packer to build AMIs. Understanding Packer will enable you to build your own AMIs for your own infrastructure and make modifications to the infrastructure we provision for you.

## Time to learn

With Gruntwork, you can accelerate your journey towards capturing your AWS cloud infrastructure as Infrastructure as Code. Although our aim is to simplify this intricate process, gaining a comprehensive understanding of your infrastructure's complexities and tailoring it to your specific needs will require a significant investment of time and effort on your part.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4ede6b938e1010b0fb0fca78fbd7edb1"
}
##DOCS-SOURCER-END -->
