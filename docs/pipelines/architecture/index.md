# Architecture

There are three components in pipelines - the orchestrator, the dispatcher, and the executor. The orchestrator determines the jobs that needs to be executed; the dispatcher calls the executor with each job and reports on their status; and the executor actually executes the jobs and makes any necessary updates in AWS.

## Orchestrator

The orchestrator identifies each infrastructure change in the pull request or git commit, classifies the type of infrastructure change it is (e.g. AccountAdded, ModuleChanged, EnvCommonChanged), and determines the right pipelines actions (e.g., `terragrunt plan`, `apply`, or `destroy`) to run based on that infrastructure change. For each infrastructure change, it calls the dispatcher.

## Dispatcher

The dispatcher takes an infrastructure change, a pipelines action, and parameters as input. Then, it calls the executor to run the action on the infrastructure change. Once complete, the dispatcher creates a pull request comment (for PR workflows) or a GitHub issue (for pushes to main) with a link to the GitHub logs.

## Executor

The executor takes a pipeline action and infra change as input then performs the action on the infra change. In some cases, like responding to AccountAdded events on merge, the executor will create a Pull Request in the infrastructure-live repository with additional IaC code to provision additional resources.

## Execution Flow

Pipelines starts with an event in GitHub - a Pull Request being created, synchronized, or re-opened, and a PR being merged to main (e.g., a push to main). From there, the orchestrator determines the infra-change set and appropriate action to run for each infra-change. The dispatcher then sends the information to the dispatcher, which calls the executor and waits for it to complete. Once complete, the status of the execution is reported to the calling Pull Request in a comment or as a GitHub issue if an apply or destroy fails.

![Gruntwork Pipelines Execution Flow](/img/pipelines/how-it-works/pipelines_execution_flow.png)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "fc39b7e05436d5ccb299ec355a135eaa"
}
##DOCS-SOURCER-END -->
