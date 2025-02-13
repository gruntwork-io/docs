# Running Pipelines for Changes to non-IaC file dependencies

Pipelines runs plan/applies based on changes to your units in your IaC repository. Intuitively, if you make a change to `path/to/my/unit/terragrunt.hcl` then Pipelines will run plan/apply in `/path/to/my/unit`.  Pipelines also supports running `run-all` when [consolidation](/2.0/reference/pipelines/configurations-as-code/api#consolidate_added_or_changed) is enabled.

However, there are some cases where you may want to run Pipelines for changes to files that are not part of your IaC. For example, you may have a `terragrunt.hcl` file that imports data from a `tags.yaml` file. If you make a change to the `tags.yaml` file, you may want to run Pipelines to plan/apply the changes to the associated `terragrunt.hcl` file.  This page documents how to configure pipelines to automatically run `plan/apply` when only these data files are changed.

## Configuration

:::note

This feature is available when using Pipelines with Terragrunt version 0.68.13 and later.

:::

Pipelines will automatically detect, based on git commit history, when data files have changed and emit a `FileChanged` change. This will create a new execution in your CI flow that will invoke Terragrunt with the [`queue-include-units-reading`](https://terragrunt.gruntwork.io/docs/reference/cli-options/#queue-include-units-reading) option set to the files that have changed. Terragrunt will then scan your code for units that depend on the changed files and add them to the plan/apply.

Note that Terragrunt will only be able to determine which units read the data file if that file is read using a built-in function such as `read_terragrunt_config` or is in a `include`, `dependency`, or `dependencies` block. You may want to use the [`mark_as_read`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#mark_as_read) function to explicitly ensure that Terragrunt knows to include your unit when a particular data file is changed.
