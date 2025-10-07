# Execution flow

Pipelines begins doing work in response to an event in GitHub/GitLab, such as the creation, update, or merging of a pull/merge request, or a push to a deploy branch (e.g., `main` or `master`). Pipelines does this in the native CI/CD feature offered by Source Control Management (SCM) platforms (GitHub Actions for GitHub, GitLab CI/CD Pipelines for GitLab).

The flow of this work consists of two main stages: the orchestrator and the executor. The orchestrator identifies and categorizes work into a set of infrastructure changes (`infra-change set`) based on the contents of a pull/merge request or push to the deploy branch, while the executor performs those tasks and updates infrastructure accordingly.

## Orchestrator

The orchestrator analyzes each infrastructure change in a pull request or git commit, categorizes the type of change (e.g., `AccountsAdded`, `ModuleChanged`, `EnvCommonChanged`), and identifies the appropriate pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to execute based on the type of change.

## Executor

The executor receives as inputs a pipeline action (e.g. `terragrunt plan`) and a specific unit of infrastructure that has been changed (e.g. `/path/to/changed-unit/terragrunt.hcl`) and executes the specified action on the specified unit.

For example, when responding to a `ModuleUpdated` event for `/some/unit/terragrunt.hcl`, the executor might execute a `terragrunt apply` on `/some/unit/terragrunt.hcl`. Or when responding to `AccountsAdded` events on merge, the executor may create a follow-up pull request in the `infrastructure-live-root` repository to include additional IaC code for baselining the newly added accounts.
