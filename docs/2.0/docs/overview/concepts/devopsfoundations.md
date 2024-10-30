# Overview of Devops Foundations

**Gruntwork DevOps Foundations is a collection of _DevOps components_ that you use as building blocks to assemble your own best-practice infrastructure.**

In a modern cloud infrastructure there are many component parts, ranging from the infrastructure pipeline to secrets management to FinOps to how you deploy apps. Setting up and managing each component requires that you understand the core infrastructure need, develop a strategy for addressing it, implement a solution, and then maintain it forever. Doing this on your own is expensive and error-prone, so Gruntwork DevOps components are designed to "pre-solve" all of these issues by including:

- Pre-written recommendations on strategy
- A collection of pre-written IaC modules with extensive documentation
- A tool that directly solves the underlying need
- A streamlined approach to implementing the component in your environment
- A commitment by Gruntwork to update the component to match the latest best practices

When you set up a new DevOps component, you also have access to guidance from Gruntwork subject matter experts to make sure the component is applied correctly in your environment.

## Available components

There are 5 DevOps components available today.

1. **[Landing Zone.](/2.0/docs/pipelines/installation/prerequisites/awslandingzone)** Set up a best-practice AWS multi-account setup, easily create new AWS accounts, and set secure account baselines.
1. **[IaC Foundations.](./iac-foundations)** Set up the foundational Terraform and Terragrunt coding patterns that enable your team to scale.
1. **[Pipelines.](../pipelines)** Roll out an infrastructure change in a way that meets the needs of your organization.
1. **[Network Topology.](../network-topology)** Protect your internal cloud resources from external access.
1. **[Running Apps.](../running-apps)** Run your apps on EKS, ECS, or Lambda in a best-practices way.

All DevOps components are focused on AWS and Terraform/OpenTofu. We may add support for additional technologies in the future.

## Building your own components

The Gruntwork DevOps components implement a meaningful portion of a modern cloud infrastructure, but not 100% of it. We expect you to build on top of the Gruntwork DevOps components by adding your own solutions to build out your full infrastructure.
