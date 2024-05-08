# Architecture

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines released in May 2024.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/overview/deprecation.md) to learn more about the deprecation of that version.
:::

## Integration With DevOps Foundations

Pipelines is designed to work best in conjunction with [DevOps Foundations](../../foundations/overview/index.md).

In the near future, we aim to provide Pipelines as a standalone product, but a significant amount of the functionality of Pipelines is dependent on the underlying infrastructure that DevOps Foundations provides. As such, it is important to understand the GitHub repositories that are created as part of DevOps Foundations, and how they interact with Pipelines.

### infrastructure-live-root

The `infrastructure-live-root` repository is the root of your infrastructure codebase. It contains the Terragrunt configuration that defines the structure of your infrastructure, and is the repository that Pipelines uses to determine what actions to take in response to infrastructure changes.

## Components

There are two major components in pipelines - the orchestrator and the executor. The orchestrator determines the jobs to be executed and the executor actually executes the jobs and makes any necessary updates in AWS.

### Orchestrator

The orchestrator identifies each infrastructure change in a pull request or git commit, classifies the type of infrastructure change it is (e.g. `AccountsAdded`, `ModuleChanged`, `EnvCommonChanged`), and determines the right pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to run based on that infrastructure change.

For example, when merging a pull request that edits the file `/dev/us-west-2/database/terragrunt.hcl`, the orchestrator would identify it as a `ModuleChanged` infra-change on the module `/dev/us-west-2/database`, requiring a `terragrunt apply`.

The executor will then run `terragrunt apply` on `/dev/us-west-2/database`.

### Executor

The executor takes a pipeline action and infra change as input from the orchestrator, and then performs specified pipelines actions on specified infra change. In some cases, like responding to `AccountsAdded` events on merge, the executor will create a subsequent pull request in the `infrastructure-live-root` repository with additional IaC code to baseline the account(s) that were just added.

## Execution Flow

Pipelines starts with an event in GitHub - a pull request being created, updated, or re-opened, and a PR being merged to `main` (or any other push to `main`). From there, the orchestrator determines the infra-change set and appropriate action to run for each infra-change. For each change in the infra-change set, the executor runs the appropriate action. The executor then logs the results of the action back in GitHub on the pull request that initiated the flow.

## Chained Actions

In some cases, the executor can create a new pull request in the same git repo after the original pull request is merged, continuing a workflow that was started by an initial pull request. In this scenario, one infra-change can trigger an action that results in a new infra-change.

### Account Creation

When Pipelines detects an `AccountsRequested` infra-change in a merged pull request, Pipelines will create new account(s) in AWS.

After the account(s) are created, Pipelines will open a new pull request in the `infrastructure-live-root` repository with additional IaC code to add configuration baseline(s) (like provisioning a VPC in the new account, or configuring specified settings for the account or services within it) to the AWS account(s) that were just added.

This will trigger an `AccountsAdded` infra-change. Merging in this new pull request will then apply the configuration baseline(s) to the new account(s).

**Enterprise** customers can expect even more automation in their workflows, as this action can chain into additional actions in other repositories.

When deciding to delegate account management to another repository, Pipelines will:

1. Create a new GitHub repository to manage the infrastructure for the new account(s).
2. Open a pull request within the `infrastructure-live-access-control` repository to manage access that the new repository has to cloud infrastructure
3. Open a pull request the newly vended repository to provide boilerplate IaC code for managing workloads within the new account(s).

## Trust Boundaries

Vital to the architecture of Pipelines is understanding of the trust model inherent to the system. Pipelines is designed to be run in a CI/CD system, which means that it has privileged access to your AWS accounts.

One principle to keep in mind is that anyone with trust to edit code on the `main` branch of your repositories is trusted to make the corresponding changes in your AWS accounts. This is why we recommend that you follow the [Repository Access](../security/repository-access.md) guidelines to ensure that only the right people have the right access to your repositories.

In addition, each AWS IAM role provisioned as part of DevOps Foundations only trusts a single repository (and for apply roles, only a single branch). If you find that you are expanding the permissions of a given role too wide, you should consider creating a new role that has more granular permissions for the specific use-case. Utilize the `infrastructure-live-access-control` repository to support that need.
