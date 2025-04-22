# Improving Performance

## Overview

Overall, given that Pipelines is a CI/CD tool for running Terragrunt, optimizing performance of Terragrunt is usually the best way to improve the performance of Pipelines.

To get a quick list of Terragrunt performance optimizations, see the [Terragrunt Performance Optimization Guide](https://terragrunt.gruntwork.io/docs/troubleshooting/performance/).

Note that the main way you're going to enable those performance optimizations is to leverage the ability to customize environment variables for Pipelines. To do so, you can configure the [`env` field of Pipelines configurations](/2.0/reference/pipelines/configurations#env) (if you are using HCL configurations as code, you'll want to configure [these configurations](/2.0/reference/pipelines/configurations-as-code/api#env-block) instead).

### Example: Use The Terragrunt Provider Cache Server

Something that can consume a large amount of time for Terragrunt is the process of downloading OpenTofu/Terraform provider binaries. To speed this up, you can enable the Terragrunt provider cache server.

To do so, you can configure the `TERRAGRUNT_PROVIDER_CACHE` environment variable to point to the Terragrunt provider cache server.

```yaml
# .gruntwork/config.yml
env:
  - name: TERRAGRUNT_PROVIDER_CACHE
    value: 1
```

This will tell Terragrunt to startup a local server (local to the CI runner) that mediates access to OpenTofu/Terraform provider binaries, allowing Terragrunt to deduplicate downloads across different OpenTofu/Terraform runs, speeding up the run.

## Run Consolidation

Another way to alter Pipelines performance is to enable/disable [consolidation](/2.0/reference/pipelines/configurations-as-code/api#consolidate_added_or_changed).

In general, consolidation can result in the most accurate runs, and (especially when combined with the Terragrunt provider cache server) can result in significant performance improvements, as provider binaries can be reused across different runs, and you can reduce the overhead of starting up runs and tearing them down.

However, if you are running a _really large_ changeset, you may find that the overhead of consolidation is too high, and you'd prefer to de-consolidate your runs so that each change can be run in its own CI runner.

To do so, you can set the `consolidate-added-or-changed` field to `false`.

```yaml
# .gruntwork/config.yml
consolidate-added-or-changed: false
```

Use this optimization with caution, as it will result in a multiplication of the cost of running the pipeline, as each change will be run in its own CI runner, and you may experience less accurate updates, as the changes may not be applied in the correct order without consolidation to ensure that Terragrunt schedules changes in their position in the [DAG](/docs/getting-started/terminology/#directed-acyclic-graph-dag).
