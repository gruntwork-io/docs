# Running Pipelines with Terragrunt Stacks

## Introduction

Terragrunt Stacks provide a powerful way to organize and manage your infrastructure code. Gruntwork Pipelines automatically integrates with Terragrunt Stacks.

Learn more about Terragrunt Stacks in the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/stacks/">Terragrunt Stacks Documentation</a></span>.

## Prerequisites

Pipelines automatically supports Terragrunt Stacks as long as you're using Terragrunt `v0.71.3` or higher. You can specify the Terragrunt binary version in the `mise.toml` file in your repository, see the [configuration reference](/2.0/reference/pipelines/configurations#example-mise-configuration).

See [Terragrunt Version Compatibility](/2.0/reference/pipelines/terragrunt-version-compatibility) for more details on specific Terragrunt versions and their compatibility with Pipelines.

## Terragrunt Stacks in Pipelines

### Detecting Stack Changes

When you create, update, or remove a `terragrunt.stack.hcl` file, Pipelines will automatically:

1. Generate the stack during orchestration 
2. Detect any changes to units and values defined in the stack
3. Plan and apply the changes as part of your existing pipelines process

Note that the stack will only be generated if there are changes to the stack file. If you make changes to the remote units defined in the stack, these changes will not be reflected in pipeline runs until the stack file is updated.

### Repository Structure

We recommend using your `infrastructure-catalog` repository to define your reusable Terragrunt Units.

Within your `infrastructure-live-root` repositories, add `terragrunt.stack.hcl` files to define your Terragrunt Stacks. You should not commit the generated `.terragrunt-stack` directories to source control, pipelines will generate these directories automatically during execution.

If you have already committed the `.terragrunt-stack` directory to source control and want to remove it, we recommend adding `[skip-ci]` in your commit message to prevent unintended infrastructure destruction. If your changes remove tracked files, but do not modify the stack file, the stack will not be generated and Pipelines will assume that the infrastructure is being removed.

### Migration from _envcommon

If your repository currently uses the _envcommon pattern, you can gradually migrate to Terragrunt Stacks without disrupting your existing workflows. See the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/migrate/terragrunt-stacks/">Terragrunt Migration Guide</a></span> for detailed instructions on transitioning from _envcommon to Stacks.

## Best Practices

- **Don't commit generated files**: The `.terragrunt-stack` directory should not be committed to source control
- **Use versioned unit sources**: When referencing units in your stack, use versioned sources (e.g. `git::git@github.com:my-org/my-catalog.git//units/foo?ref=v0.2.0`). This ensures that the stack can be updated to a specific version of the unit.
