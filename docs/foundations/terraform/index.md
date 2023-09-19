# About IaC Foundations

The IaC Foundations component is focused on:

- Teaching you the considerations to think about when coming up with your foundational Terraform and Terragrunt patterns
- Giving you a fully configured set of git repositories with an initial folder structure

## IaC foundations considerations

When creating your initial Terraform and Terragrunt and infrastructure, there are a number of patterns you need to consider how to solve. These include:

- How to create the backend (e.g. S3 bucket) for storing Terraform state
- How to structure your folder hierarchy
- How to handle tagging and labels
- Whether to use branches per environment
- How to handle global variables
- How to handle module default values

## Initial setup

Working with Gruntwork, we will guide you through a workflow to create an `infrastructure-live` repository to describe your Terraform code, along with an `infrastructure-modules` repository to house your Terraform modules. The patterns we create will directly address the considerations above.

When we create these repositories, we typically also create an `infrastructure-pipelines` repository to set up [Gruntwork Pipelines](../ci-cd/).

TODO: Add a link here or a new page ("Initial setup") in this section that guides the user to https://github.com/gruntwork-io/infrastructure-live-template and https://github.com/gruntwork-io/infrastructure-modules-template.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c6bb156b8c5a24de24dd4ac1a9489eb4"
}
##DOCS-SOURCER-END -->
