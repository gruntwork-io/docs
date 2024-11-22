# About IaC Foundations

The IaC Foundations component is focused on:

- Teaching you the considerations to think about when coming up with your foundational Terraform/OpenTofu and Terragrunt patterns
- Giving you a fully configured set of git repositories with an initial folder structure

## What's included

- **Strategy.** We recommend core patterns your Terragrunt and Terraform/OpenTofu git repo needs to incorporate to scale effectively.
- **IaC Modules.** No IaC modules are needed for this component.
- **Tooling.** We recommend Terragrunt to effectively use Terraform/OpenTofu at scale.
- **Setup.** We grant you access to a sophisticated git repo template that includes customization options and generates your repo code.
- **Updates.** We publish ongoing updates to IaC foundational patterns and will write [patches](/2.0/docs/patcher/concepts/patches) if applicable to adopt those changes.

## IaC foundations considerations

When creating your initial Terraform/OpenTofu and Terragrunt infrastructure, there are a number of patterns you need to consider how to solve, including:

- How to create the backend (e.g. S3 bucket) for storing Terraform state
- How to structure your folder hierarchy
- How to handle tagging and labels
- Whether to use branches per environment
- How to handle global variables
- How to handle module default values

This component includes either pre-baked implementations that address these considerations, or written guidance on how to incorporate them yourself.