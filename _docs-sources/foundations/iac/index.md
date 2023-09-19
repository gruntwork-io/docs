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

We provide 3 template repos to subscribers that implement best practices regarding the considerations above.

### Infrastructure Live Template

Navigate to the [infrastructure-live template](https://github.com/gruntwork-io/infrastructure-live-template) and select **Use this template** -> **Create a new Repository**.
This will initiate repository creation. You should select your org as the owner, add a description if you like, and click **Create repository**.

The repository template will be created and you can follow the instructions in the README to bootstrap your IaC Foundations.

### Infrastructure Modules Template

Navigate to the [infrastructure-modules template](https://github.com/gruntwork-io/infrastructure-modules-template) and select **Use this template** -> **Create a new Repository**.
This will initiate repository creation. You should select your org as the owner, add a description if you like, and click **Create repository**.

The repository template will be created and you can follow the instructions in the README to bootstrap your Infrastructure Modules.

### Infrastructure Pipelines Template

This repository is only necessary if you plan on implementing [Gruntwork Pipelines](../ci-cd)

Navigate to the [infrastructure-pipelines template](https://github.com/gruntwork-io/infrastructure-pipelines-template) and select **Use this template** -> **Create a new Repository**.
This will initiate repository creation. You should select your org as the owner, add a description if you like, and click **Create repository**.

The repository template will be created and you can follow the instructions in the README to bootstrap your CI/CD Foundations.
