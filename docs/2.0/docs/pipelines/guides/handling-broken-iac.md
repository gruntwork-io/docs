# Handling Broken Infrastructure as Code

When working with Infrastructure as Code (IaC) at scale, you may occasionally encounter broken or invalid configuration files that prevent Terragrunt from successfully running operations. These issues can block entire CI/CD pipeline, preventing even valid infrastructure changes from being deployed.

This guide presents several strategies for handling broken IaC while keeping your pipelines operational.

## Understanding the Problem

Common causes of broken IaC include:

- Syntax errors in Terragrunt or Terraform files
- References to non-existent modules or resources
- Dependencies on resources that no longer exist
- Partially committed changes with missing dependencies
- Breaking changes in module versions
- Temporary or experimental code
- Resources or modules that have are work in progress

Depending on the type of run pipeline is executing, broken IaC can fail a pipeline and prevent other, legitimate changes from being deployed. Especially in circumstances where pipelines will trigger a `terragrunt run-all` it is important that all IaC is valid or properly excluded.

## Resolution Strategies

Here are several approaches to manage broken IaC, presented in order of preference:

### 1. Fix the Invalid Code (Preferred Solution)

The ideal solution is to fix the underlying issues:

```bash
# Create a branch for your fix
git checkout -b fix-broken-infrastructure

# Fix the invalid IaC files
# ...

# Commit and push your changes
git add .
git commit -m "Fix broken IaC in module-x"
git push
```

Then create a merge/pull request to apply the fix to your main branch.

### 2. Remove the Invalid IaC

If you can't fix the issue immediately but the infrastructure is no longer needed, you can remove the problematic code:

```bash
# Remove the broken IaC directory
git rm -rf path/to/broken/module

# Commit and push your changes
git add .
git commit -m "Remove deprecated infrastructure module"
git push
```

### 3. Use a `.terragrunt-excludes` File

If you wish to keep the broken code as is and simply have it ignored by pipelines and Terragrunt, you can use a `.terragrunt-excludes` file to skip problematic units:

1. Create a `.terragrunt-excludes` file in the root of your repository:

```
# .terragrunt-excludes
# One directory per line (no globs)
account/region/broken-module1
account/region/broken-module2
```

2. Commit this file to your repository, and Terragrunt will automatically exclude these directories when using `run-all`.  Note, if you make a change to the code in those units and pipelines triggers a `run` in that directory itself, then the exclude will not be applied.

### 4. Configure Exclusions with Pipelines Environment Variables

If you don't wish to use `.terragrunt-excludes` in the root of the repository, you can create another file in a different location and set the `TG_QUEUE_EXCLUDES_FILE` environment variable to that path. You then use the Pipelines [`env` block](/2.0/reference/pipelines/configurations-as-code/api#env-block) in your `.gruntwork/pipelines.hcl` configuration to set environment variables that control Terragrunt's behavior:

```hcl
repository {
  env {
    # Set path to a file containing directories to exclude
    TG_QUEUE_EXCLUDES_FILE = ".terragrunt-excludes"

    # ...
  }
}
```

:::warning
 Pipelines often uses `TG_QUEUE_EXCLUDE_DIR` internally, so we recommend using `TG_QUEUE_EXCLUDES_FILE` instead to avoid conflicts.
 :::

### Handling Dependencies

When excluding modules, be aware of dependencies:

1. If module B depends on module A, and module A is excluded, you may need to exclude module B as well.
2. Use `terragrunt graph-dependencies` to visualize your dependency tree.

## Best Practices

1. **Document exclusions**: Add comments to your `.terragrunt-excludes` file explaining why each directory is excluded.
2. **Set expiration dates**: Include dates when exclusions should be revisited.
3. **Track in issue system**: Create tickets for excluded modules that need to be fixed.
4. **Regular cleanup**: Periodically review and update your excluded directories.
5. **Validate locally**: Run `terragrunt hcl-validate` or `terragrunt validate` locally before committing changes.

## Troubleshooting

If you're still experiencing issues after excluding directories:

- Ensure paths in your exclusion file match exactly (they're case-sensitive and relative to the repository root)
- Check if excluded modules are dependencies for other modules
- Review pipeline logs to confirm exclusions are being applied
- Verify you don't have conflicting environment variable settings

By implementing these strategies, you can keep your infrastructure pipelines running smoothly while addressing underlying issues in your codebase.