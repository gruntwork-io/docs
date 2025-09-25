# Execution flow

Pipelines begins doing work in response to an event in GitHub/GitLab, such as the creation, update, or merging of a pull/merge request, or a push to a deploy branch (e.g., `main` or `master`). The orchestrator determines the set of infrastructure changes (`infra-change set`) and selects the appropriate action for each change. For every change in the set, the executor performs the necessary action and logs the results in GitHub/GitLab, attaching them to the merge request/pull request that triggered the workflow.

The Pipelines execution flow consists of two main stages: the orchestrator and the executor. The orchestrator identifies necessary jobs based on the contents of a pull/merge request or push to the deploy branch, while the executor performs those tasks and updates resources accordingly.

## Orchestrator

The orchestrator analyzes each infrastructure change in a pull request or git commit, categorizes the type of change (e.g., `AccountsAdded`, `ModuleChanged`, `EnvCommonChanged`), and identifies the appropriate pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to execute based on the type of change.

## Executor

The executor receives a pipeline action and an infrastructure change as input and executes the specified action on the change. For example, when responding to `AccountsAdded` events on merge, the executor may create a follow-up pull request in the `infrastructure-live-root` repository to include additional IaC code for baselining the newly added accounts.
