# Components Architecture

There are two major components in pipelines - the orchestrator and the executor. The orchestrator determines the jobs to be executed and the executor actually executes the jobs and makes any necessary updates in AWS.

## Orchestrator

The orchestrator identifies each infrastructure change in a pull request or git commit, classifies the type of infrastructure change it is (e.g. `AccountsAdded`, `ModuleChanged`, `EnvCommonChanged`), and determines the right pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to run based on that infrastructure change.

## Executor

The executor takes a pipeline action and infra change as input then performs the action on the infra change. In some cases, like responding to `AccountsAdded` events on merge, the executor will create a subsequent pull request in the `infrastructure-live-root` repository with additional IaC code to baseline the account(s) that were just added.

## Execution Flow

Pipelines starts with an event in GitHub - a pull request being created, updated, or re-opened, and a PR being merged to `main` (or any other push to `main`). From there, the orchestrator determines the infra-change set and appropriate action to run for each infra-change. For each change in the infra-change set, the executor runs the appropriate action. The executor then logs the results of the action back in GitHub on the pull request that initiated the flow.

## Trust Boundaries

Vital to the architecture of Pipelines is understanding of the trust model inherent to the system. Pipelines is designed to be run in a CI/CD system, which means that it has privileged access to your AWS accounts.

One principle to keep in mind is that anyone with trust to edit code on the `main` branch of your repositories is trusted to make the corresponding changes in your AWS accounts. This is why we recommend that you follow the [Repository Access](../security/repository-access.md) guidelines to ensure that only the right people have the right access to your repositories.

In addition, each AWS IAM role provisioned as part of DevOps Foundations only trusts a single repository (and for apply roles, only a single branch). If you find that you are expanding the permissions of a given role too wide, you should consider creating a new role that has more granular permissions for the specific use-case. Utilize the `infrastructure-live-access-control` repository to support that need.
