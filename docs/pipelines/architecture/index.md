# Architecture

## Overview

There are three major components in the Gruntwork Pipelines architecture:

1. The orchestrator
2. The dispatcher
3. The executor

### The orchestrator

The orchestrator identifies each [infrastructure change](../core-concepts/#infrastructure-change) in the Pull Request or git commit, classifies the type of infrastructure change it is (e.g. NewAwsAccount vs. OpenTfModuleUpdate) and determines the right [pipelines actions](../core-concepts/#pipelines-actions) to run based on that infrastructure change. For each infrastructure change, it calls the dispatcher.

### The dispatcher

The dispatcher takes as input an infrastructure change and a list of which pipelines actions to run with along with what parameters, and calls the executor to run these actions on the right infrastructure change.

### The executor

The executor executes an ordered list of pipelines actions against a specific pull request or git commit in response to a specific infrastructure. It then posts the status and output of these pipelines actions to the pull request, or takes other actions to ensure that the user has visibility into what happened.

## Execution Flow

You can see these components in action below:

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)


## Separating execution from configuration

Infrastructure pipelines typically require admin-level permissions to deploy virtually any infrastructure. This makes them attractive security targets. An attacker who gains access to the infrastructure pipeline woudl likely have the power to destroy the entire cloud architecture.

To mitigate this threat, a key design decision in Gruntwork Pipelines is to separate code that triggers _execution_ of Pipelines, from code that changes the _configuration_ of Pipelines.

The code that triggers execution of Pipelines is typically defined in a dedicated git repo (commonly named `infrastructure-live`) whose purpose is to describe all deployed infrastructure. By contrast, the code that _configures_ how deployments are done lives in a different git repo (commonly named `infrastructure-pipelines`).

This allows your team to have many collaborators for your IaC in your `infrastructure-live` repository, while permitting a subset of administrators access to the workflows in `infrastructure-pipelines` that can access your AWS environments.

Workflows running in the `infrastructure-live` repository trigger workflows to run in `infrastructure-pipelines`, which runs the appropriate terragrunt command on the changed code to perform changes to your infrastructure.

![Gruntwork Pipelines Architecture](/img/pipelines/how-it-works/pipelines_architecture.png)

## Permissions

Permissions are granted by three [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams) - `infrastructure-collaborators`, `infrastructure-administrators`, and `ci-code-read-only`.

These teams should map to three personas in your organization. The `infrastructure-collaborators` team is for engineers who work on the IaC codebase daily but _do not_ have administrative permissions in AWS. Similarly, the `infrastructure-administrators` team is for engineers who likely work on the IaC codebase daily, but _do_ have administrative AWS permissions. Finally, the `ci-code-read-only` team is meant for a single machine user who can read your `infrastructure-live` and `infrastructure-modules` (a repository where you can define custom Terraform modules for your organization) repositories.

![Gruntwork Pipelines Permissions](/img/pipelines/how-it-works/pipelines_security.png)

Each team and their permissions are designed to grant the _least possible permissions_ to each individual (or machine user) in your organization for them to be able to perform changes to your infrastructure. Those in the `infrastructure-administrators` team will likely already have similar access granted to them though an AWS IAM role or IAM policy.



## Usage Data

Gruntwork Pipelines captures usage data to better understand how our customers use our products. This information includes the duration of pipelines runs, the number of jobs you run, customer name, and application errors that occur during execution. If you would like to disable telemetry, please set the environment variable `PIPELINES_TELEMETRY_OPT_OUT=1` in your CI job.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9179663e194a0e0f707c99d8eeee9d8e"
}
##DOCS-SOURCER-END -->
