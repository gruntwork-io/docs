# Overview of Devops Foundations

**Gruntwork DevOps Foundations is a collection of _DevOps components_ that you use as building blocks to assemble your own best-practice infrastructure.**

In a modern cloud infrastructure there are many component parts, ranging from the infrastructure pipeline to secrets management to FinOps to how you deploy apps. Setting up and managing each component requires that you understand the core infrastructure need, develop a strategy for addressing it, implement a solution, and then maintain it forever. Doing this on your own is expensive and error-prone, so Gruntwork DevOps components are designed to "pre-solve" all of these issues by including:

- Pre-written recommendations on strategy
- A collection of pre-written IaC modules with extensive documentation
- A tool that directly solves the underlying need
- A streamlined approach to implementing the component in your environment
- A commitment by Gruntwork to update the component to match the latest best practices

When you set up a new DevOps component, you also have access to guidance from Gruntwork subject matter experts to make sure the component is applied correctly in your environment, and grows in capability as your needs evolve.

## Available components

There are several DevOps components available today:

* [Infrastructure-Live](./infrastructure-live.md): An opinionated structure for IaC repositories that includes a set of best practices for how to structure your OpenTofu code to keep things DRY at enterprise scale.
* [Pipelines](/2.0/docs/pipelines/concepts/overview.md): A complete CI/CD pipeline for infrastructure code, a set of best practices for how to structure your OpenTofu code, and a set of scripts for managing the pipeline.
* [Account Factory](/2.0/docs/accountfactory/concepts/): A set of automated workflows to provision new AWS accounts and apply compliance, security and infrastructure baselines to enforce business rules across many accounts.
* [Patcher](/2.0/docs/patcher/concepts/): Identify out of date modules across your repositories and create pull requests that both updates versions and automatically refactors code to get through breaking changes without developer intervention.
* [Library](/2.0/docs/library/concepts/overview): Over 300,000 lines of terraform code modules that are designed to be used as building blocks for your infrastructure. From VPCs to ECS clusters to S3 buckets, the library has you covered.
<!-- * [Catalog]  -- see DEV-628 -->
<!-- Something about networking / transit gateway? -->

All DevOps components are focused on Terragrunt, OpenTofu/Terraform, GitHub and AWS. We may add support for additional technologies in the future.

## Building your own components

The Gruntwork DevOps components implement a meaningful portion of a modern cloud infrastructure, but not 100% of it. We expect you to build on top of the Gruntwork DevOps components by adding your own solutions to build out your full infrastructure.

All of the components in DevOps Foundations are designed to be extensible and customizable. We recognize that most of our customers are developers, and we want to make sure you are empowered to easily build the solutions you need instead of relying exclusively on Gruntwork to have them pre-built in every circumstance. We encourage collaboration with our customers, and are always looking for feedback, and contributions to improve our components.
