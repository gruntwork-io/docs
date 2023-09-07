# How it works

There are three aspects to pipelines - the orchestrator, the dispatcher, and the executor. The orchestrator determines the jobs that needs to be executed based on the _infrastructure change set_. The dispatcher then calls the executor for each _infrastructure change_ in the _infrastructure change set_, then reports the status of the job to either the originating Pull Request (for PRs) or, in the event of an apply or destroy failure, creates a GitHub issue with a link to the job logs so you can triage the issue.

## Architecture

Due to the necessity of having administrative permissions in your CI system to deploy infrastructure, Gruntwork Pipelines separates _where_ changes occur from _how_ those changes are deployed. Infrastructure is _defined_ in one GitHub repository (commonly named `infrastructure-live`) and the code that _deploys_ your infrastructure is stored in a different GitHub repository (commonly named `infrastructure-pipelines`).

This allows your team to have many collaborators for your IaC in your `infrastructure-live` repository, while permitting a subset of administrators access to the workflows in `infrastructure-pipelines` that can access your AWS environments.

Workflows running in the `infrastructure-live` repository trigger workflows to run in `infrastructure-pipelines`, which runs the appropriate terragrunt command on the changed code to perform changes to your infrastructure.

![Gruntwork Pipelines Architecture](/img/pipelines/how-it-works/pipelines_architecture.png)

## Permissions

Permissions are granted by three [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams) - `infrastructure-collaborators`, `infrastructure-administrators`, and `ci-code-read-only`.

These teams should map to three personas in your organization. The `infrastructure-collaborators` team is for engineers who work on the IaC codebase daily but _do not_ have administrative permissions in AWS. Similarly, the `infrastructure-administrators` team is for engineers who likely work on the IaC codebase daily, but _do_ have administrative AWS permissions. Finally, the `ci-code-read-only` team is meant for a single machine user who can read your `infrastructure-live` and `infrastructure-modules` (a repository where you can define custom Terraform modules for your organization) repositories.

![Gruntwork Pipelines Permissions](/img/pipelines/how-it-works/pipelines_security.png)

Each team and their permissions are designed to grant the _least possible permissions_ to each individual (or machine user) in your organization for them to be able to perform changes to your infrastructure. Those in the `infrastructure-administrators` team will likely already have similar access granted to them though an AWS IAM role or IAM policy.

## Execution Flow

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)


## Usage Data

Gruntwork Pipelines captures usage data to better understand how our customers use our products. This information includes the duration of pipelines runs, the number of jobs you run, customer name, and application errors that occur during execution. If you would like to disable telemetry, please set the environment variable `PIPELINES_TELEMETRY_OPT_OUT=1` in your CI job.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "617529ecc10d7ff8085fb5f64ec64cb5"
}
##DOCS-SOURCER-END -->
