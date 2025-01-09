# Components Architecture

Pipelines consists of two main components: the orchestrator and the executor. The orchestrator determines which jobs need to be executed, while the executor performs those jobs and makes any required updates in AWS.

## Orchestrator

The orchestrator analyzes each infrastructure change in a pull request or git commit, categorizes the type of change (e.g., `AccountsAdded`, `ModuleChanged`, `EnvCommonChanged`), and identifies the appropriate pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to execute based on the type of change.

## Executor

The executor receives a pipeline action and an infrastructure change as input and executes the specified action on the change. For example, when responding to `AccountsAdded` events on merge, the executor may create a follow-up pull request in the `infrastructure-live-root` repository to include additional IaC code for baselining the newly added accounts.

## Execution flow

Pipelines begins with an event in GitHub, such as the creation, update, or reopening of a pull request, or a push to `main` (e.g., merging a pull request). The orchestrator determines the set of infrastructure changes (`infra-change set`) and selects the appropriate action for each change. For every change in the set, the executor performs the necessary action and logs the results in GitHub, attaching them to the pull request that triggered the workflow.

## Trust boundaries

A critical aspect of Pipelines' architecture is understanding its trust model. Since Pipelines runs within a CI/CD system, it has privileged access to your AWS accounts.

Anyone with the ability to edit code in the `main` branch of your repositories inherently has the authority to make corresponding changes in your AWS accounts. For this reason, it is important to follow the [Repository Access](/2.0/docs/pipelines/installation/viamachineusers#repository-access) guidelines to ensure appropriate access control.

Additionally, each AWS IAM role provisioned through DevOps Foundations is configured to trust a single repository (and, for apply roles, a single branch). If a role's permissions become overly broad, consider creating a new role with more granular permissions tailored to the specific use case. Use the `infrastructure-live-access-control` repository to define and manage these roles.
