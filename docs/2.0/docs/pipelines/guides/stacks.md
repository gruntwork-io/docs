# Using Terragrunt Stacks

## Introduction

Terragrunt Stacks provide a powerful way to organize and manage your infrastructure code. Stacks simplify your infrastructure management by allowing you to define and deploy collections of related infrastructure units with a single file, reducing repetition and enabling consistent patterns across environments, customers, or regions.

Learn more about Terragrunt Stacks in the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/stacks/">Terragrunt Stacks Documentation</a></span> and the <span class="external-link"><a href="https://blog.gruntwork.io/the-road-to-terragrunt-1-0-stacks-cd97f11ef565">The Road to 1.0: Terragrunt Stacks</a></span> blog post.

Gruntwork Pipelines has full support for Terragrunt Stacks without need for any additional configuration. When you include `terragrunt.stack.hcl` files in your IaC repository, Gruntwork Pipelines will automatically detect any relevant changes, and automatically generate the resulting unit configurations. You don't need to (and should not) commit the generated units to source control; commit only the stack configuration files and leave the rest to Gruntwork Pipelines.

## Prerequisites

Pipelines v3 automatically supports Terragrunt Stacks as long as you're using Terragrunt `v0.71.3` or higher. You can specify the Terragrunt binary version in the `mise.toml` file in your repository, see the [configuration reference](/2.0/reference/pipelines/configurations#example-mise-configuration).

See [Terragrunt Version Compatibility](/2.0/reference/pipelines/terragrunt-version-compatibility) for more details on specific Terragrunt versions and their compatibility with Pipelines.

## Terragrunt Stacks in Pipelines

### Getting Started

To get started, follow these steps:

1. Create Terragrunt Stack definitions (`terragrunt.stack.hcl` files) in your live IaC repo for any units you wish to configure as stacks. When referencing units in your stack, use versioned sources (e.g. `git::git@github.com:my-org/my-catalog.git//units/foo?ref=v0.2.0`). This ensures that the stack can be updated to a specific version of the unit.

2. If the stacks pertain to units which you’ve previously committed to your IaC repo, set the `no_dot_terragrunt_stack` flag to true so that generated stacks will appear at the same directory path as your current stacks (instead of a hidden one). You should then remove the unit directories encoded with stacks from source control — Gruntwork Pipelines will generate these automatically when you deploy new changes. See the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/migrate/terragrunt-stacks/#step-4-re-define-existing-infrastructure-using-terragruntstackhcl-files">Migration Guide</a></span> for more details.

3. You can run `terragrunt stack generate` locally to preview the units configured in your stacks. However, do not commit the generated files to source control. Gruntwork Pipelines will generate these automatically when you deploy new changes.

4. Add, modify, or remove stacks as needed. Gruntwork Pipelines will detect relevant changes as described in more detail below.


### Detecting Stack Changes

When you create, update, or remove a `terragrunt.stack.hcl` file, Pipelines will automatically:

1. Generate the stack during orchestration 
2. Detect any changes to units and values defined in the stack
3. Plan and apply the changes as part of your existing pipelines process

::note
Note that the stack will only be generated if there are changes to the stack file. If you make changes to the remote units defined in the stack, these changes will not be reflected in pipeline runs until the stack file is updated.
::

### Repository Structure

We recommend using your `infrastructure-catalog` repository to define your reusable Terragrunt Units.

Within your `infrastructure-live-root` repositories, add `terragrunt.stack.hcl` files to define your Terragrunt Stacks.

::warning
You should not commit the generated `.terragrunt-stack` directories to source control, pipelines will generate these directories automatically during execution.
::

#### Removing .terragrunt-stack directories

::note
The following is only necessary if you've accidentally committed `.terragrunt-stack` directories to source control, which should be avoided.
::

If you find yourself in the situation where `.terragrunt-stack` directories have been committed to your repository, you'll need to remove them carefully. When doing so, add `[skip-ci]` to your commit message to prevent unintended infrastructure destruction. Without this flag, if Pipelines detects removed tracked files but doesn't see corresponding stack file modifications, it may interpret this as infrastructure that should be destroyed.

### Migration from _envcommon

The _envcommon pattern can be gradually replaced with Terragrunt Stacks while maintaining your existing workflows. Stacks provide a more structured and version-controlled alternative to _envcommon. Instead of updating shared files that immediately affect all dependent units across your repository, Stacks enable incremental rollouts of infrastructure changes through explicit versioning. This allows you to deploy changes to development environments first, then progressively to staging and production environments as confidence builds. For step-by-step migration instructions, see the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/migrate/terragrunt-stacks/">Terragrunt Migration Guide</a></span>.