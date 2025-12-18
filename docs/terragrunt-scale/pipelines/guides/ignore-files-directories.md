# Ignoring Files and Directories from Pipelines Runs

## Introduction

Pipelines allows you to ignore specific files and directories so that changes to them do not trigger plan or apply runs. This is especially useful for excluding documentation, test data, or other files that should not affect your infrastructure deployments, helping you reduce unnecessary CI/CD runs and noise in your workflow.

## Setting up the Ignore List

To set up the ignore list, you can add it to your Pipelines configuration using either HCL or YAML. For example, in HCL, you would add an `ignore_list` field to your `.gruntwork/pipelines.hcl` configuration:

```hcl
repository {
  ignore_list = "README.md,docs/**.md,local-testing/**"
  # ... other config ...
}
```

Or, in YAML, you would add an `ignore-list` field to your `.gruntwork/config.yml`:

```yaml
pipelines:
  ignore-list: "README.md,docs/**.md,local-testing/**"
  # ... other config ...
```

The patterns you use in the ignore list are always relative to the repository root, and you can combine multiple patterns by separating them with commas.

For more details and the full syntax, see the [Ignore List Reference](/docs/terragrunt-scale/pipelines/reference/ignore-list).

:::note
The ignore list supports two types of wildcards: `*` and `**`.

- The single asterisk `*`, matches any character **except** the directory separator `/` - this allows you to match file and directory names at a specific depth.
- The double asterisk `**` matches any character, **including** `/` - this allows you to match files and directories at any depth.

E.g. `a/*-dev/b` will match `a/my-dev/b` but not `a/b/c/my-dev/b`.
:::

## Practical example

Let's walk through a practical example. Suppose you want to ensure that changes to any `README.md` file — whether at the root or in any subdirectory — do not trigger Pipelines runs. First, use the pattern `README.md` to match the file at the root of your repository. Next, add `**/README.md` to match any `README.md` file in any subdirectory, at any depth. Combine these patterns with a comma: `README.md,**/README.md`. Your configuration would look like this in HCL:

```hcl
repository {
  ignore_list = "README.md,**/README.md"
}
```

Or in YAML:

```yaml
pipelines:
  ignore-list: "README.md,**/README.md"
```

:::note
Why do we need to use two patterns, not just `**README.md`?

We need to include a directory separator after the `**` so that if any other files _happened_ to end with `README.md` they would not be matched. By adding the directory separator we are no longer matching the root `README.md` file, so we need to add both patterns.
:::