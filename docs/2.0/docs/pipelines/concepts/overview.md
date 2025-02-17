# What is Gruntwork Pipelines?

**Gruntwork Pipelines enables your organization to deploy infrastructure changes to cloud environments with simplicity, control, and confidence.**

After working with hundreds of organizations to improve DevOps processes, we’ve identified two key truths about managing infrastructure changes:

1. Teams want to control exactly how infrastructure change gets rolled out
2. Deploying infrastructure changes can be scary!

To address the need for **control**, Gruntwork Pipelines uses [configuration as code](/2.0/reference/pipelines/configurations-as-code/api). Using HCL (a widely adopted alternative to JSON and YAML), you can define configuration values for your entire Git repository, specific environments, or individual deployable infrastructure units. For instance, you can specify unique AWS authentication strategies at different levels, from individual units to the entire repository.

To address the need for **assurance**, Gruntwork Pipelines provides a clear and user-friendly `terragrunt plan` experience. It also allows customization to include any additional steps your organization requires to build confidence in a deployment. Building assurance also factors heavily into our roadmap.

## Built for Terragrunt

Gruntwork is the creator and maintainer of [Terragrunt](https://terragrunt.gruntwork.io), so we built Gruntwork Pipelines with first-class support for the full Terragrunt lifecycle, including:
- `terragrunt plan`
- `terragrunt apply`
- `terragrunt destroy`
- `terragrunt run-all`

Gruntwork actively contributes to Terragrunt, ensuring it supports features critical to Gruntwork Pipelines.

## Simplifies CI/CD Complexity

One of the things we've discovered over the years helping customers automate their infrastructure management is that it can be _very_ costly and time-consuming to build and maintain a CI/CD pipeline that can efficiently handle the complexity of infrastructure changes. Customers typically don't want to trigger an update to _all_ of their infrastructure whenever _any_ component changes, and they typically want to have related changes coordinated and rolled out correctly.

A driving design goal of Gruntwork Pipelines is to allow for a minimal setup experience, followed by a very intuitive model for driving infrastructure updates. Most customers can get Pipelines configured in less than an hour, then drive all of their infrastructure changes directly via pull requests to Infrastructure as Code. Most of the time, you do not need to think about how Gruntwork Pipelines works, or how it makes decisions about what to do. You simply update your Infrastructure as Code to reflect the desired state of your infrastructure, have the pull request reviewed and merged, then Gruntwork Pipelines takes care of the rest.

## Runs in GitHub Actions or GitLab CI

Gruntwork Pipelines integrates directly with GitHub Actions or GitLab CI, using a pull request-centric workflow. All information about a proposed infrastructure change is added as comments to the relevant pull request, and infrastructure changes are applied by interacting with the pull request.

This approach ensures Gruntwork Pipelines operates independently of Gruntwork servers. All `terragrunt` operations are executed within GitHub Actions or GitLab CI, giving you full control over your infrastructure automation. Secrets and state files remain secure within GitHub Actions or GitLab CI.

We continually update Gruntwork Pipelines, delivering new features and security improvements without requiring any action on your part.

## Common terms

Gruntwork Pipelines uses specific terminology to describe infrastructure changes and associated operations. Below are key terms used in the documentation:

### Infrastructure change

An _infrastructure change_ occurs when you edit Infrastructure as Code (IaC) that needs to be applied to your cloud account (e.g., AWS or GCP). These changes are often referred to as "infra-changes." Examples include modifying variables in OpenTofu/Terraform or Terragrunt code. Gruntwork Pipelines assumes infra-changes are committed via git, typically through a pull request, which "proposes" the change.

### Infrastructure change set

An _infrastructure change set_ refers to pull requests that involve multiple infra-changes. For example, changes to an "envcommon" file in Terragrunt may affect several modules. A change set represents all related infra-changes that need to be applied together.

### Pipelines actions

_Pipelines actions_ describe the operations triggered by proposed infra-changes, such as running a `terragrunt plan` or estimating costs. Gruntwork Pipelines supports a growing library of actions and continues to expand its capabilities over time.
