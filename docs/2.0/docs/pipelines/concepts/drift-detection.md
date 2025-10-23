# Pipelines Drift Detection

:::note
Pipelines Drift Detection is available exclusively to DevOps Foundations Enterprise customers on GitHub and GitLab.
:::

## What is Pipelines Drift Detection

Infrastructure drift occurs when the applied Terragrunt cloud configuration no longer matches the committed Infrastructure as Code (IaC).

Pipelines Drift Detection helps address drift in your repositories by running `terragrunt plan` on infrastructure units. If drift is detected, Pipelines creates a Drift Detected Pull Request (GitHub) or Merge Request (GitLab) to track the changes in your repository.

When the Drift Detected Pull/Merge Request is merged, Pipelines runs `terragrunt apply` on all units where drift was identified, ensuring that resources align with the specifications in your code.

For more information on detecting and resolving drift, see [Setting up Drift Detection](/2.0/docs/pipelines/configuration/driftdetection) and [Running Drift Detection](/2.0/docs/pipelines/guides/running-drift-detection).
