# What is Gruntwork Pipelines?

**Gruntwork Pipelines enables your organization to deploy infrastructure changes to cloud environments with simplicity, control, and confidence.**

After working with hundreds of organizations to improve DevOps processes, we’ve identified two key truths about managing infrastructure changes:

1. Teams need control over how infrastructure changes are rolled out.
2. Deploying infrastructure changes often carries risks.

To address the need for **control**, Gruntwork Pipelines uses [configuration as code](/2.0/reference/pipelines/configurations-as-code/api). Using HCL (a widely adopted alternative to JSON and YAML), you can define configuration values for your entire Git repository, specific environments, or individual deployable infrastructure units. For instance, you can specify unique AWS authentication strategies at different levels, from individual units to the entire repository.

To address the need for **assurance**, Gruntwork Pipelines provides a clear and user-friendly `terragrunt plan` experience. It also allows customization to include any additional steps your organization requires to build confidence in a deployment. Assurance remains a key focus for future updates.

## Built for Terragrunt

Gruntwork Pipelines is built with first-class support for the full Terragrunt lifecycle, including:
- `terragrunt plan`
- `terragrunt apply`
- `terragrunt destroy`
- `terragrunt run-all`

Gruntwork actively contributes to Terragrunt, ensuring it supports features critical to Gruntwork Pipelines.

## Simplifies CI/CD Complexity

Building and maintaining a CI/CD pipeline for infrastructure changes can be costly and time-consuming. Customers typically need pipelines that coordinate related changes effectively without triggering updates across all infrastructure components unnecessarily.

Gruntwork Pipelines is designed for minimal setup, followed by intuitive infrastructure updates. Most customers can configure Pipelines in under an hour and manage all infrastructure changes directly through pull requests. With Pipelines, you update your Infrastructure as Code to reflect the desired state, submit a pull request for review, and let Pipelines handle the rest.

## Runs in GitHub Actions

Gruntwork Pipelines integrates directly with GitHub Actions, using a pull request-centric workflow. All information about a proposed infrastructure change is added as comments to the relevant pull request, and infrastructure changes are applied by interacting with the pull request.

This approach ensures Gruntwork Pipelines operates independently of Gruntwork servers. All `terragrunt` operations are executed within GitHub Actions, giving you full control over your infrastructure automation. Secrets and state files remain secure within GitHub Actions.

We continually update Gruntwork Pipelines, delivering new features and security improvements without requiring any action on your part.

## Common terms

Gruntwork Pipelines uses specific terminology to describe infrastructure changes and associated operations. Below are key terms used in the documentation:

### Infrastructure change

An _infrastructure change_ occurs when you edit Infrastructure as Code (IaC) that needs to be applied to your cloud account (e.g., AWS or GCP). These changes are often referred to as "infra-changes." Examples include modifying variables in OpenTofu/Terraform or Terragrunt code. Gruntwork Pipelines assumes infra-changes are committed via git, typically through a pull request, which "proposes" the change.

### Infrastructure change set

An _infrastructure change set_ refers to pull requests that involve multiple infra-changes. For example, changes to an "envcommon" file in Terragrunt may affect several modules. A change set represents all related infra-changes that need to be applied together.

### Pipelines actions

_Pipelines actions_ describe the operations triggered by proposed infra-changes, such as running a `terragrunt plan` or estimating costs. Gruntwork Pipelines supports a growing library of actions and continues to expand its capabilities over time.

