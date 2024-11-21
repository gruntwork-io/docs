# What is Gruntwork Pipelines?

**Gruntwork Pipelines is designed to enable your organization to deploy infrastructure changes to cloud environments simply, with control and confidence.**

Having worked with hundreds of organizations to help them improve DevOps, we've discovered two truths about making changes to infrastructure:

1. Teams want to control exactly how infrastructure change gets rolled out
2. Deploying infrastructure changes can be scary!

To address your need for _control_, we've designed Gruntwork Pipelines to use [configuration as code](/2.0/reference/pipelines/configurations-as-code/api), where you use HCL (a popular alternative to JSON and YAML) to set configuration values that apply to your entire git repo, to just one environment, or to a single deployable unit of infrastructure. For example, you can specify a unique AWS authentication strategy for each deployable unit of infrastructure, one per environment, or a single strategy for the entire git repo.

To address your need for _assurance_ that an infrastructure change is safe to apply, we include a thoughtfully formatted `terragrunt plan` user experience, and the ability to customize Gruntwork Pipelines to support arbitrary steps that your organization needs to establish confidence in a deployment. Building assurance also factors heavily into our roadmap.

## Built for Terragrunt

Gruntwork is the creator and maintainer of [Terragrunt](https://terragrunt.gruntwork.io), so we built Gruntwork Pipelines with first-class support for the full Terragrunt lifecycle, including:
- `terragrunt plan`
- `terragrunt apply`
- `terragrunt destroy`
- `terragrunt run-all`

We also make updates directly to Terragrunt to support the functionality we want to see in Gruntwork Pipelines.

## Reduces the complexity of CI/CD

One of the things we've discovered over the years helping customers automate their infrastructure management is that it can be _very_ costly and time-consuming to build and maintain a CI/CD pipeline that can efficiently handle the complexity of infrastructure changes. Customers typically don't want to trigger an update to _all_ of their infrastructure whenever _any_ component changes, and they typically want to have related changes coordinated and rolled out correctly.

A driving design goal of Gruntwork Pipelines is to allow for a minimal setup experience, followed by a very intuitive model for driving infrastructure updates. Most customers can get Pipelines configured in less than an hour, then drive all of their infrastructure changes directly via pull requests to Infrastructure as Code. Most of the time, you do not need to think about how Gruntwork Pipelines works, or how it makes decisions about what to do. You simply update your Infrastructure as Code to reflect the desired state of your infrastructure, have the pull request reviewed and merged, then Gruntwork Pipelines takes care of the rest.

## Runs directly in GitHub Actions

Gruntwork Pipelines runs directly in your GitHub Actions workflows, and uses a pull request-centric workflow. This means that all information about a proposed infrastructure change is added as comments to the applicable pull request, and that you apply the infrastructure change by interacting with the pull request.

This also means that Gruntwork Pipelines does not depend on Gruntwork servers to perform any `terragrunt` operations. You are fully in control over the execution of your infrastructure automation, and can customize the behavior of Gruntwork Pipelines to suit your organization's needs.

Gruntwork does not need access to your secrets or state files, as these remain in GitHub Actions. At the same time, we continually push new features and updates to Gruntwork Pipelines so that your user experience, security posture, and feature set continues to improve with no effort on your part.

## Common Terms

Gruntwork Pipelines uses specific terminology to describe code changes and operations that occur as a result of changes. This section will familiarize you with the terminology used throughout the Gruntwork Pipelines documentation.

### Infrastructure change

When you edit any Infrastructure As Code (IAC) that needs to be "applied" to your cloud account (e.g. AWS or GCP), you are making an _infrastructure change_. We sometime call these an "infra-change" for short.

Infra-changes can involve updates to OpenTofu/Terraform or Terragrunt code, or any other type of file that represents a desired state of your infrastructure and that needs to be somehow applied. A classic example is changing some variables on an instance of an OpenTofu module. Gruntwork Pipelines assumes that infra-changes are committed via git, usually by first opening a pull request. When you open a pull request, you are essentially "proposing" an infra-change.

### Infrastructure change set

Sometimes users create a pull request that changes more than one file at a time. And sometimes a change to a single file affects how multiple other files will be "applied" to your live cloud account. For example, many users of Terragrunt use a pattern known as "envcommon" as a way to specify a default set of values for modules.

When more than one infra-change is made at a time, we call this an _infrastructure-change set_.

### Pipelines actions

When a user proposes to make an infra-change by opening a pull request, we want to take some kind of "action" in response to that proposed-change. For example, we may want to run a `terragrunt plan` and estimate the cost of applying this Terragrunt plan. We call these _pipelines actions_.

Gruntwork is responsible for adding support for a growing library of Pipelines Actions and we will continue to add more over time.
