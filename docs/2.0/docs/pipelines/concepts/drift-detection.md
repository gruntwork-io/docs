# Pipelines Drift Detection

:::note
Pipelines Drift Detection is only available to Devops Foundations Enterprise customers.
:::

## What is Pipelines Drift Detection

Infrastructure Drift occurs when the applied terragrunt cloud configuration differs from the committed Infrastructure as Code (IaC).

Pipelines Drift Detection helps to mitigate Drift in your repositories by running `terragrunt plan` on infrastructure units. If the plan detects any units have drifted from their applied configuration Pipelines will open a Drift Detected Pull Request tracking this drift in your repository.

When the Drift Detected Pull Request is merged, Pipelines will run `terragrunt apply` on all units where drift was detected to ensure resources once again match what is specified in code.

See [Managing Drift](/2.0/docs/pipelines/guides/managing-drift) for more information on how to manage drift in your repositories.
