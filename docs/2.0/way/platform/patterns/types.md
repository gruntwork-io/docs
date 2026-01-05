---
sidebar_position: 2
title: Types
---

# Pattern Types

Patterns come in a few different flavors. Let's look at them now.

## Infrastructure modules

Infrastructure modules are reusable, parameterized code that define infrastructure resources and their configuration.

The key point is that a module declares _what will actually be deployed_, and typically allows some customizability by exposing variables or parameters.

Examples:
- OpenTofu/Terraform modules
- CloudFormation templates
- Pulumi component resources
- Helm charts

:::info
Infrastructure modules are by far the most common type of pattern.
:::

## Infrastructure module instances

Infrastructure module instances are _instances_ of [infrastructure modules](#infrastructure-modules) that include guidance on how the module should be configured and deployed.

Examples:
- [Terragrunt units](https://terragrunt.gruntwork.io/docs/features/units/) (instantiates an OpenTofu/Terraform module)
- [Terragrunt stacks](https://terragrunt.gruntwork.io/docs/features/stacks/) (instantiates one or more Terragrunt units)
- OpenTofu code that calls an OpenTofu module
- CloudFormation stack (instantiates a CloudFormation template)

## Policies

Policies are automated rules that enforce governance, compliance, and security requirements for your infrastructure.

You can evaluate either live infrastructure, a plan for creating live infrastructure (e.g. `terragrunt plan` output), or an [infrastructure module](#infrastructure-modules) to see if it complies with a given policy.

Examples:
- OPA/Rego/`conftest` policies
- AWS Config rules
- AWS Service Control Policies (SCPs)

## Templates

Templates are predefined project structures that provide customized starting points for new projects, services, or components. They scaffold out directory structures, configuration files, and boilerplate code based on parameterized inputs.

Templates can be used to generate anything, but are most commonly used to generate [infrastructure module instances](#infrastructure-module-instances), sometimes for complex use cases.

Examples:
- [Gruntwork Boilerplate](https://github.com/gruntwork-io/boilerplate) templates
- Cookiecutter templates
- Yeoman generators

## Runbooks

Runbooks are step-by-step (and sometimes interactive) operational procedures for infrastructure tasks such as incident response, guided code generation, troubleshooting, and recovery.

Runbooks can be especially well-suited to generating code based on [templates](#templates).

Examples:
- [Gruntwork Runbooks](https://runbooks.gruntwork.io/)
- Jupyter Notebooks
- Ansible Playbooks

## Other

The common theme among pattern types is that, per our definition of a pattern, they are all pre-built, opinionated solutions to common infrastructure problems.

Notably these problems exist at different levels of abstraction! For example, a **runbook** might use a **template** to generate an **infrastructure module instance,** which in turn instantiates an **infrastructure module.** Likewise, a **policy** can operate on any level of this hierarchy.

Perhaps in the future we'll have other pattern types that can be listed here.

## Next

Next, let's learn about where you store patterns.

