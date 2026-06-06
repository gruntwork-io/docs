# Architecture

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

There are three components in pipelines - the orchestrator, the dispatcher, and the executor. The orchestrator determines the jobs that needs to be executed; the dispatcher calls the executor with each job and reports on its status; and the executor actually executes the jobs and makes any necessary updates in AWS.

## Orchestrator

The orchestrator identifies each infrastructure change in the pull request or git commit, classifies the type of infrastructure change it is (e.g. AccountAdded, ModuleChanged, EnvCommonChanged), and determines the right pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to run based on that infrastructure change. For each infrastructure change, it calls the dispatcher.

## Dispatcher

The dispatcher takes an infrastructure change, a pipelines action, and parameters as input. Then, it calls the executor to run the action on the infrastructure change. Once complete, the dispatcher creates a pull request comment (for PR workflows) or a GitHub issue (for pushes to main) with a link to the GitHub logs.

## Executor

The executor takes a pipeline action and infra change as input then performs the action on the infra change. In some cases, like responding to AccountAdded events on merge, the executor will create a pull request in the `infrastructure-live` repository with additional IaC code to provision additional resources.

## Execution Flow

Pipelines starts with an event in GitHub - a pull request being created, synchronized, or re-opened, and a PR being merged to main (e.g., a push to main). From there, the orchestrator determines the infra-change set and appropriate action to run for each infra-change. The dispatcher then sends the information to the dispatcher, which calls the executor and waits for it to complete. Once complete, the status of the execution is reported to the calling pull request in a comment or as a GitHub issue if an apply or destroy fails.

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)

## Isolating IaC definitions and deployment

Due to the necessity of having administrative permissions in your CI system to deploy infrastructure, Gruntwork Pipelines separates where changes occur from where they are applied. Infrastructure is _defined_ in one GitHub repository (commonly named `infrastructure-live`) and the code that _deploys_ your infrastructure is stored in a different GitHub repository (commonly named `infrastructure-pipelines`). This is done to allow you to use the principle of least privilege to each repository. For more information on pipelines’ security model see [controls](../security/controls.md) and [repository access](../security/repository-access.md).

This allows your team to have many collaborators for your IaC in your `infrastructure-live` repository, while permitting a subset of administrators access to the workflows in `infrastructure-pipelines` that can access your AWS environments.

Workflows running in the `infrastructure-live` repository trigger workflows to run in `infrastructure-pipelines`, which runs the appropriate terragrunt command on the changed code to perform changes to your infrastructure. Pipelines uses OIDC to assume a role in your AWS account with a policy that limits access exclusively to the `main` branch of your `infrastructure-pipelines` repository. No other repository or branch can leverage this role to gain access to your AWS accounts.

![Gruntwork Pipelines Architecture](/img/pipelines/how-it-works/pipelines_architecture.png)

:::info Previous Version Available
You are reading documentation for Gruntwork Pipelines. The previous version of Gruntwork Pipelines is known as [ECS Deploy Runner](../../ecs-deploy-runner/overview/).
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "3093f55a1ec5041354f01a27829e18e6"
}
##DOCS-SOURCER-END -->
